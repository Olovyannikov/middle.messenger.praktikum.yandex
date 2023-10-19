import { JSDOM } from 'jsdom';
import sinon from 'sinon';

const jsdom = new JSDOM('<body></body>', {
    url: 'https://example.com',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
