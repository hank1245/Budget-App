import {Modal, Form, Button} from 'react-bootstrap'
import {useRef} from 'react'
import { useBudgets } from '../contexts/BudgetContext'


function AddBudgetModal({show, handleClose}) {
  const nameRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()
  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
        name: nameRef.current.value,
        max: parseFloat(maxRef.current.value)
    })
    handleClose()
  }
  return (
    <Modal show = {show} onHide = {handleClose}>
        <Form onSubmit = {handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>새 예산 짜기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>이름</Form.Label>
                    <Form.Control ref={nameRef} type='text' required/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='max'>
                    <Form.Label>최대 지출</Form.Label>
                    <Form.Control ref={maxRef} type='number' required min={0} step={10} />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type="submit">추가하기</Button>
                </div>
            </Modal.Body>
        </Form>

    </Modal>
  )
}

export default AddBudgetModal