import * as FiberHooks from '@/jsx/reconciler/FiberHooks.ts';
import { createRenderer } from '@/jsx/reconciler/FiberReconciler.ts';
import * as Context from './Context.ts';
import * as DomStack from '../shared/testStackSize';
import { createElement } from '@/jsx/core/CreateElement.ts';
import { Fragment } from '@/jsx/shared/Types.ts';

export type Override<T, K extends keyof T, V> = {
    [P in keyof T]: P extends K ? V : T[P];
};

const useCallBack = FiberHooks.useCallBack;
const useMemo = FiberHooks.useMemo;
const useReducer = FiberHooks.useReducer;
const useRef = FiberHooks.useRef;
const useState = FiberHooks.useState;
const useEffect = FiberHooks.useEffect;

const createContext = Context.createContext;

const Stack = DomStack;

export default {
    useCallBack,
    useMemo,
    useReducer,
    useRef,
    useState,
    useEffect,
    createElement,
    createRenderer,
    Fragment,
    createContext,
    Stack,
};
