import InputWithFix from 'app/common/components/InputWithFix';
import { create } from 'react-test-renderer';



describe("InputWithFix Component Unit Testing", _ => {

    it('Test InputWithFix Cases',  () => {
      // 1st case
      const component = create(      
          <InputWithFix
              type='text' 
              placeholder="0.00" 
              pattern="[\d]{1,}"
              required 
              name="test1"
              key={1}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(      
          <InputWithFix
              type='amount' 
              placeholder="0.00" 
              pattern="[\d\.]{1,}"
              required 
              name="test2"
              prefix="$"
              key={2}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 3rd case
      component.update(      
          <InputWithFix
              type='text' 
              placeholder="0.00" 
              pattern="^(\d{0,2}(\.\d+)?|100(\.0+)?)$"
              required 
              name="percent"
              affix="%"
              key={3}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 4th case
      component.update(      
          <InputWithFix
              type='text' 
              placeholder="00" 
              pattern="[\d\.]{1,}"
              required 
              name="amount"
              prefix="$"
              affix=".00"
              key={4}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});