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

    //Check strings against regular expressions with toMatch:
    test('there is no I in team', () => {
        expect('team').not.toMatch(/I/);
    });

    test("but there is a 'stop' in Christoph", () => {
        expect('Christoph').toMatch(/stop/);
    });

    //Arrays & iterables: Check to see if array or iterable contains particular item using toContain:

    const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towerls',
        'milk'
    ];

    test('the shopping list has milk on it', () => {
        expect(shoppingList).toContain('milk');
    })

    //If you want to test whether a particular functions throws an error when it's called, use toThrow:

    function compileAndroidCode() {
        throw new Error('you are using the wrong JDK');
    };

    test('compiling android goes as expected', () => {
        expect( () => compileAndroidCode()).toThrow();
        expect( () => compileAndroidCode()).toThrow(Error);

        // You can also use the exact error message or a regexp
        expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
        expect(() => compileAndroidCode()).toThrow(/JDK/);
    });