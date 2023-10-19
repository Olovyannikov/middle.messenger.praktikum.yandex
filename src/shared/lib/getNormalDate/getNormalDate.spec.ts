import { describe } from 'mocha';
import sinon from 'sinon';
import { getNormalDate } from './getNormalDate.ts';
import { assert } from 'chai';

describe('getNormalDate', () => {
    it('should return the correct time in the format "HH:mm"', () => {
        const mockDate = new Date('2023-10-15T12:30:45');
        const clock = sinon.useFakeTimers(mockDate);

        const expectedResult = { messageTime: '12:30' };
        const result = getNormalDate(new Date());

        assert.deepEqual(result, expectedResult);

        clock.restore();
    });

    it('must add a leading zero to hours and minutes if they are less than 10', () => {
        const mockDate = new Date('2023-10-15T09:05:00');
        const clock = sinon.useFakeTimers(mockDate);

        const expectedResult = { messageTime: '09:05' };
        const result = getNormalDate(new Date());

        assert.deepEqual(result, expectedResult);

        clock.restore();
    });
});