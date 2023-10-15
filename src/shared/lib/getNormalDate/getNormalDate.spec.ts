import { describe } from 'mocha';
import sinon from 'sinon';
import { getNormalDate } from './getNormalDate.ts';
import { assert } from 'chai';

describe('getNormalDate', () => {
    it('должна возвращать правильное время в формате "HH:mm"', () => {
        const mockDate = new Date('2023-10-15T12:30:45');
        const clock = sinon.useFakeTimers(mockDate);

        const expectedResult = { messageTime: '12:30' };
        const result = getNormalDate(new Date());

        assert.deepEqual(result, expectedResult);

        clock.restore();
    });

    it('должна добавлять ведущий ноль к часам и минутам, если они менее 10', () => {
        const mockDate = new Date('2023-10-15T09:05:00');
        const clock = sinon.useFakeTimers(mockDate);

        const expectedResult = { messageTime: '09:05' };
        const result = getNormalDate(new Date());

        assert.deepEqual(result, expectedResult);

        clock.restore();
    });
});