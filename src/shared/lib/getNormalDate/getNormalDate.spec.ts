import { getNormalDate } from './getNormalDate';

describe('getNormalDate', () => {
    it('should format date correctly', () => {
        const inputDate = new Date('2023-10-21T12:30:00');
        const result = getNormalDate(inputDate);
        expect(result.messageTime).toBe('12:30');
    });
});