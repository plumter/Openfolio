import InputError from 'app/common/components/InputError';
import { create } from 'react-test-renderer';

describe("InputError Component Unit Testing", _ => {

    it('Test InputError Cases',  () => {
      // 1st case
      const component = create(      
          <InputError
              name="email"
              validation={{validated: false, fields:{email: false}}}
              text="Enter a valid email address"
              key={1}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(      
          <InputError
              name="email"
              validation={{validated: true, fields:{email: false}}}
              text="Enter a valid email address"
              key={2}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 3rd case
      component.update(      
          <InputError
              name="email"
              validation={{validated: true, fields:{email: true}}}
              text="Enter a valid email address"
              key={3}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});