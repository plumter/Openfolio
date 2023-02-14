import CustomSelect from 'app/common/components/CustomSelect';
import { create } from 'react-test-renderer';


describe("CustomSelect Component Unit Testing", _ => {

    it('CustomSelect Cases',  () => {
      // 1st case
      const component = create(   
          <CustomSelect
            data={["A", "B", "C"]}
            required 
            name="letters"
            placeholder="Select Letters"
            key={1}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 2nd case
      component.update(  
          <CustomSelect
            data={["A", "B", "C"]}
            required 
            name="letters"
            placeholder="Select Letters"
            searchable={true}  
            key={2}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 3rd case
      component.update(  
          <CustomSelect
            data={["A", "B", "C"]}
            required 
            name="letters"
            placeholder="Select Letters"
            searchable={true}  
            formatOpt={item => item && `${item}${item}`}
            key={3}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 4th case
      component.update(  
          <CustomSelect
            data={["A", "B", "C"]}
            required 
            name="letters"
            placeholder="Select Letters"
            searchable={true}  
            formatOpt={item => `${item}${item}`}
            formatSelected={item => `${item}${item}`}
            key={4}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();

      // 5th case
      component.update(  
          <CustomSelect
            data={["A", "B", "C"]}
            required 
            name="letters"
            placeholder="Select Letters"
            searchable={true}  
            formatOpt={item => `${item}${item}`}
            formatSelected={item => `${item}${item}${item}`}
            formatValue={item => `${item ?? ""}${item ?? ""}${item ?? ""}${item ?? ""}`}
            key={5}
          />,
        );
      expect(component.toJSON()).toMatchSnapshot();
    });  
});