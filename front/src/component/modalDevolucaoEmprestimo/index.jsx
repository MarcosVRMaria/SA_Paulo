import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from '../dropdown';

function ModalFinalizar({ info }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {info.metodo}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title>{info.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Dropdown
                        placeholder={"Matricula"}
                        selectedOption={info.matriculaSelect}
                        setSelectOption={info.setMatriculaSelect}
                        options={info.matricula}
                    />
                    <Dropdown
                        placeholder={"Empréstimos Ativos"}
                        selectedOption={info.emprestimoSelect}
                        setSelectOption={info.setEmprestimoSelect}
                        options={info.emprestimo}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={info.ok}>Finalizar Empréstimo</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalFinalizar;