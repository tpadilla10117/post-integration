/* This file is a Sample unit test for the funtion sum: */

    const sum = require('./sum');

    test('adds 1 + 2 to equal 3', () => {
        expect( sum(1, 2) ).toBe(3);
    });