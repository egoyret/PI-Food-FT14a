import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Form  from '../views/InputForm.jsx';

describe('<Form /> Mounted', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Form />);
  });
  it('El form debe tener un label que diga: "Titulo (*)"', () => {
      const { container } = render(<Form />)
      const element = container.querySelectorAll('label')[0]
      expect(element.innerHTML).toBe('Titulo (*)');
  });

  it('El form debe tener un label que diga: "Resumen (*)"', () => {
    const { container } = render(<Form />)
    const element = container.querySelectorAll('label')[1]
    expect(element.innerHTML).toBe('Resumen (*)');
  });

  it('El form debe tener un input con name "nombre" y type "text"', () => {
    const { container } = render(<Form />)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('nombre');
  });

  it('El form debe tener un input con name "resumen" y type "text"', () => {
    const { container } = render(<Form />)
    const element = container.querySelectorAll('input')[1]
    expect(element.type).toBe('text');
    expect(element.name).toBe('resumen');
  });

  it('El input de nombre no debe tener mensaje de error si fue ingresado correctamente',  () => {
      wrapper.find('input[name="nombre"]').simulate('change', {target: {name: 'nombre', value: 'My new value'}});
      const ele = wrapper.input.errors.nombre.length;
      expect(ele === 0).toBeTruthy();
   });

   it('El input de nombre debe tener mensaje de error si fue ingresado incorrectamente',  () => {
    wrapper.find('input[name="nombre"]').simulate('change', {target: {name: 'nombre', value: ''}});
    const ele = wrapper.input.errors.nombre.length;
    expect(ele === 0).toBeFalsy();
 });
 
});
