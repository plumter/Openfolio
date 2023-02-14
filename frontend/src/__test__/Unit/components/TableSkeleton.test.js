import TableSkeleton from 'app/common/components/TableSkeleton';
import { create } from 'react-test-renderer';



describe("TableSkeleton Component Unit Testing", _ => {

    it('Test TableSkeleton Cases',  () => {
      // 1st case
      const component = create(      
          <TableSkeleton
              key={1}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(    
          <TableSkeleton
              row={20}
              key={2}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 3rd case
      component.update(    
          <TableSkeleton
              col={10}
              key={3}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 4th case
      component.update(    
          <TableSkeleton
              row={15}
              col={6}
              key={4}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 5th case
      component.update(    
          <TableSkeleton
              row={15}
              col={6}
              key={5}
              height={100}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 6th case
      component.update(    
          <TableSkeleton
              row={15}
              col={6}
              key={6}
              height={100}
              className="my-8"
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});