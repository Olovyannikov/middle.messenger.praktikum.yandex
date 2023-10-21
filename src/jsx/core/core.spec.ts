import {
    createFragmentElement,
    createElement,
    createTextElement,
} from './jsx.ts';

describe('Virtual DOM', () => {
    test('should create a text element', () => {
        const textElement = createTextElement('Hello, World!');
        expect(textElement.type).toBe('TEXT_ELEMENT');
        expect(textElement.props.nodeValue).toBe('Hello, World!');
        expect(textElement.props.children).toEqual([]);
    });

    test('should create a fragment element', () => {
        const fragmentElement = createFragmentElement({ children: [] });
        expect(fragmentElement).toEqual([]);
    });

    test('should create an element with props and children', () => {
        const element = createElement('div', { id: 'myDiv' }, [
            'Hello, World!',
        ]);
        expect(element.type).toBe('div');
        expect(element.props).toEqual({
            id: 'myDiv',
            children: [
                {
                    type: 'TEXT_ELEMENT',
                    props: {
                        nodeValue: 'Hello, World!',
                        children: [],
                    },
                },
            ],
        });
    });
});