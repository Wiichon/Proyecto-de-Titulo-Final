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
    <div className=''>
      <Changer/>
      <div ref={componentRef}  >
         <ChartsForEvidences/> 
         <ChartsForCases/>
      </div>
      <button onClick={handlePrint}>Exportar a PDF</button>     
    </div>
  )
}

export default ChartsPage