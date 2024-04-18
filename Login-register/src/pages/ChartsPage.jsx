import React,{useRef} from 'react'
import ChartsForEvidences from '../components/ChartsForEvidences'
import { useReactToPrint } from 'react-to-print';
import ChartsForCases from '../components/ChartsForCases'
import Changer from '../components/Changer'
function ChartsPage() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Evidencias',
  })

  return (
    <div >
      <Changer/>
      <div ref={componentRef}  >
        <h1 className='justify-center flex items-center'>Evidencias</h1>
         <ChartsForEvidences/> 
         <h1 className='justify-center flex items-center'>Casos</h1>
         <ChartsForCases/>
      </div>
      <button onClick={handlePrint}>Exportar a PDF</button>     
    </div>
  )
}

export default ChartsPage