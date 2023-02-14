import SpinnerButton from 'app/common/components/SpinnerButton';
import { create } from 'react-test-renderer';



describe("Spinner Button Component Unit Testing", _ => {

    it('Test Spinner Button Cases',  () => {
      // 1st case
      const component = create(      
          <SpinnerButton 
              type="submit" 
              disabled={true} 
              className="w-full btn-primary" 
              isLoading={false}
              key={1}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(      
        <SpinnerButton 
            type="submit" 
            disabled={false} 
            className="w-full btn-primary" 
            isLoading={false}
            key={2}
        />,
      );
      expect(component.toJSON()).toMatchSnapshot();

      // 3rd case
      component.update(      
        <SpinnerButton 
            type="submit" 
            disabled={false} 
            className="w-full btn-primary" 
            isLoading={true}
            key={3}
        />,
      );
      expect(component.toJSON()).toMatchSnapshot();

      // 4th case
      component.update(      
        <SpinnerButton 
            type="submit" 
            disabled={true} 
            className="w-full btn-primary" 
            isLoading={true}
            key={4}
        />,
      );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});