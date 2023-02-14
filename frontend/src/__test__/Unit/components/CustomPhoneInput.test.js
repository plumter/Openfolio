import CustomPhoneInput from 'app/common/components/CustomPhoneInput';
import { create } from 'react-test-renderer';

describe("Custom Phone Input Component Unit Testing", _ => {

    it('Test Custom Phone Input Cases',  () => {
      // 1st case
      const component = create(      
          <CustomPhoneInput key={1} />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(      
          <CustomPhoneInput
            name="phone"
            required 
            key={2}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 3rd case
      component.update(      
          <CustomPhoneInput
            name="phone"
            required 
            key={3}
            defaultCountryCode="+1"
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 4th case
      component.update(      
          <CustomPhoneInput
            name="phone"
            required 
            key={4}
            defaultValue="+866787656778"
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});