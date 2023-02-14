import CustomFileUpload from 'app/common/components/CustomFileUpload';
import { create } from 'react-test-renderer';


describe("CustomFileUpload Component Unit Testing", _ => {

    it('CustomFileUpload Cases',  () => {
      // 1st case
      const component = create(      
          <CustomFileUpload name="test1" key={1} />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(  
          <CustomFileUpload name="test2" progress={20} key={2} />,
        );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});