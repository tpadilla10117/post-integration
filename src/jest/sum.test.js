/* This file is a Sample unit test for the funtion sum: */

    const sum = require('./sum');

    test('adds 1 + 2 to equal 3', () => {
        expect( sum(1, 2) ).toBe(3);
        expect( sum(1, 2)).toEqual(3);
    });

    //this test is to check for floating point numbers:
    test('adding floating point numbers', () => {
        const value = 0.1 + 0.2;
        expect(value).toBeCloseTo(0.3);
    });