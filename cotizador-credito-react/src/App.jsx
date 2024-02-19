import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotal, calcularMes } from './helpers';

const App = () => {

  const [amount, setAmount] = useState(10000);
  const [month, setMonth] = useState(6);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect( () => {
    // calculando el total a pagar
    const resultadoTotalPagar = calcularTotal(amount, month);
    setTotal(resultadoTotalPagar)

    
  }, [amount, month])

  useEffect( () =>{
    // calculando el pago mensual
    const resultadoPagoMensual = calcularMes(total, month)
    setMonthlyPayment(resultadoPagoMensual)
  }, [total]);


  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;


  function handleChangeAmount(e){
    
    setAmount(Number(e.target.value))
    
  }

  function handleClickDecrement() {
    const value = amount - STEP;

    if (value < MIN){
      alert("Can't do that!!!");
      return;
    }
    setAmount(value)
  }

  function handleClickIncrement() {
    const value = amount + STEP;

    if (value > MAX){
      alert("Can't do that!!!");
      return;
    }
    setAmount(value);
  }

  return ( 
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10" >
      <Header />

    <div className='flex justify-between my-12'>

      <Button 
        signals= '-'
        fn= {handleClickDecrement}
      />
      <Button 
        signals= '+'
        fn={handleClickIncrement}
      />

    </div>

      <input 
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600 mt-8"
        onChange={ handleChangeAmount}
        min={MIN}
        max={MAX}
        step={STEP}
        value={amount}
      />

      <p className='text-center font-extrabold text-indigo-600 text-5xl my-10'>
        {formatearDinero(amount)}
      </p>

      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
        Choose a <span className='text-indigo-600'>time limit</span> to pay
      </h2>

      <select 
      className='mt-5 w-full p-2 bg-white border border-gray-500 rounded-lg text-center text-xl font-bold text-grey-500'
      value={month}
      onChange={e => setMonth(Number(e.target.value))}
      >
        <option value="6">6 months</option>
        <option value="12">12 months</option>
        <option value="24">24 months</option>
      </select>


      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Resume <span className='text-indigo-600'> of Payments</span>
        </h2>
        <p className='text-xl text-gray-500 text-center font-bold'> Months: { month }</p>
        <p className='text-xl text-gray-500 text-center font-bold'>Total Amount: {formatearDinero(total)}</p>
        <p className='text-xl text-gray-500 text-center font-bold'>Monthly: {formatearDinero(monthlyPayment)}</p>

      </div>

    </div>
  );


}

export default App;