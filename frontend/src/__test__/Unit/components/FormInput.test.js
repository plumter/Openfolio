import { create } from 'react-test-renderer';
import SVG from "react-inlinesvg";
import FormInput from 'app/common/components/FormInput';

describe("FormInput Component Unit Testing", _ => {

    it('Test FormInput Cases',  () => {
      // 1st case
      const component = create(      
          <FormInput
            label="Address:"
            placeholder="Enter Company Address" 
            name="address"
            minLength="2"
            key={1}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(      
          <FormInput
            label={<>Company Name:<span className="text-danger">*</span></>}
            placeholder="Enter Company Name" 
            name="company"
            required
            minLength="2"
            validation={{}}
            prefix={<span className="border-r pr-2 pl-1 pb-1 inline-block dark:border-r-dark"> 
                    <SVG
                        src="/assets/media/svg/company.svg"
                        className="stroke-current w-5 inline-block"
                    />
                </span>}
            key={2}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 3rd case
      component.update(      
          <FormInput
            type="url"
            label="Website:"
            placeholder="Enter website url" 
            name="website"
            validation={{}}
            invalidMessage="Enter valid Url"
              key={3}
          />,
        );

        // 4th case
        component.update(      
            <FormInput
                label={<>Name:<span className="text-danger">*</span></>}
                placeholder="Enter your Name" 
                name="name"
                required
                minLength="2"
                validation={{}}
                key={4}
            />,
          );

          // 5th case
          component.update(      
              <FormInput
                label={<>Email:<span className="text-danger">*</span></>}
                type='email' 
                placeholder="example@mail.com" 
                required
                name="email"
                value="chineduegenti@gmail.com"
                readOnly
                validation={{}}
                key={5}
              />,
            );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});