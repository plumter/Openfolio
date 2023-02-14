const { debounce } = require("app/common/util/Helpers");



describe("Helpers Unit Testing", _ => {

    it('Test Debounce Util', async () => {
        let i = 0;
        const bounce = debounce(_ => i++, 20);
        setTimeout(bounce, 10);
        setTimeout(bounce, 20);
        setTimeout(bounce, 30);
        setTimeout(bounce, 40);
        setTimeout(bounce, 50);
        setTimeout(bounce, 60);

        await new Promise(r => setTimeout(r, 200));
        expect(i).toEqual(1);
    });


});