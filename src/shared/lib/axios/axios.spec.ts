import { expect, use } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { SinonStub, createSandbox } from 'sinon';
import sinonChai from 'sinon-chai';
import { Axios } from '../axios/axios.ts';

describe('Axios', () => {
    use(sinonChai);
    const sandbox = createSandbox();
    let http: Axios;
    let getStub: SinonStub;
    let postStub: SinonStub;
    let putStub: SinonStub;
    let deleteStub: SinonStub;

    beforeEach(() => {
        http = new Axios();
        getStub = sandbox
            .stub(http, 'get')
            .resolves({ data: 'mocked GET response' } as never);
        postStub = sandbox
            .stub(http, 'post')
            .resolves({ data: 'mocked POST response' } as never);
        putStub = sandbox
            .stub(http, 'put')
            .resolves({ data: 'mocked PUT response' } as never);
        deleteStub = sandbox
            .stub(http, 'delete')
            .resolves({ data: 'mocked DELETE response' } as never);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should mock the GET request', async () => {
        const response = await http.get('/api/data');
        expect(response?.data).to.equal('mocked GET response');
        expect(getStub).to.have.been.calledOnceWithExactly('/api/data');
    });

    it('should mock the POST request', async () => {
        const response = await http.post('/api/data', { key: 'value' });
        expect(response?.data).to.equal('mocked POST response');
        expect(postStub).to.have.been.calledOnceWithExactly('/api/data', {
            key: 'value',
        });
    });

    it('should mock the PUT request', async () => {
        const response = await http.put('/api/data/1', { key: 'value' });
        expect(response?.data).to.equal('mocked PUT response');
        expect(putStub).to.have.been.calledOnceWithExactly('/api/data/1', {
            key: 'value',
        });
    });

    it('should mock the DELETE request', async () => {
        const response = await http.delete('/api/data/1');
        expect(response?.data).to.equal('mocked DELETE response');
        expect(deleteStub).to.have.been.calledOnceWithExactly('/api/data/1');
    });
});
