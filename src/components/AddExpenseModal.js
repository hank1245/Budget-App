import {Modal, Form, Button} from 'react-bootstrap'
import {useRef} from 'react'
import { useBudgets } from '../contexts/BudgetContext'
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext'


function AddExpenseModal({show, handleClose, defaultBudgetId}) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addExpense, budgets } = useBudgets()
  function handleSubmit(e) {
    e.preventDefault()
    addExpense({
        description: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value),
        budgetId: budgetIdRef.current.value
    })
    handleClose()
  }
  return (
    <Modal show = {show} onHide = {handleClose}>
        <Form onSubmit = {handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>새 비용 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='description'>
                    <Form.Label>내역</Form.Label>
                    <Form.Control ref={descriptionRef} type='text' required/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='amount'>
                    <Form.Label>비용</Form.Label>
                    <Form.Control ref={amountRef} type='number' required min={0} step={10}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='budgetId'>
                    <Form.Label>예산</Form.Label>
                    <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                        <option id={UNCATEGORIZED_BUDGET_ID}>미분류</option>
                        {budgets.map(budget => (
                            <option key={budget.id} value={budget.id}>{budget.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type="submit">추가하기</Button>
                </div>
            </Modal.Body>
        </Form>

    </Modal>
  )
}

export default AddExpenseModal