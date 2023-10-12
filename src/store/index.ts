type Effect = () => void;
type DepMap = Map<PropertyKey, Set<Effect>>;
type TargetMap = WeakMap<object, DepMap>;

let activeEffect: Effect | null = null;
const targetMap: TargetMap = new WeakMap();

function track(target: object, key: PropertyKey) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map<PropertyKey, Set<Effect>>();
        targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set<Effect>();
        depsMap.set(key, dep);
    }

    if (activeEffect) dep.add(activeEffect);
}

function trigger(target: object, key: PropertyKey) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }

    const dep = depsMap.get(key);
    if (!dep) {
        return;
    }

    dep.forEach((effect) => effect());
}

export function reactive<T extends object>(target: T): T {
    const handler: ProxyHandler<T> = {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            track(target, key);
            return result;
        },
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            trigger(target, key);
            return result;
        },
    };

    return new Proxy(target, handler);
}

export function effect(fn: Effect) {
    activeEffect = fn;
    if (activeEffect) activeEffect();
    activeEffect = null;
}
