'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';
import { toast } from 'react-toastify';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({orderId, amount}:Props) => {
  const [{isPending}] = usePayPalScriptReducer();
  const roundedAmount = (Math.round(amount * 100) /100).toString();

  if(isPending){
    return (
      <div className='animate-pulse mb-11'>
        <div className='h-11 bg-gray-300 rounded'/>
        <div className='h-11 bg-gray-300 rounded mt-2'/>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions):Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount,
            currency_code: 'USD'
          }
        }
      ]
    })

    //Transaction - ACTION
    const resp = await setTransactionId(transactionId, orderId);

    if(!resp.ok){
      toast.error(resp.message)
    }
    return transactionId;
  };

  const onApprove = async(data: OnApproveData, actions: OnApproveActions):Promise<void> => {

    const details = await actions.order?.capture();
    if(!details) return;

    await paypalCheckPayment(details.id!);

  }


  return (
    <PayPalButtons 
      createOrder={createOrder}
      onApprove={onApprove}
    />
  )
}
