import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.css'
import InputTextDefault from '../inputTextDefault';

function ModalEditar({ info }) {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => {

        if (info.select.length > 1 || info.select.length == 0) {
            return alert("Selecione apenas um para editar.")
        }    
        setShow(true)
        info.funcTipo(info.select[0].tipo)
        info.funcMarca(info.select[0].marca)
        info.funcNome(info.select[0].nome)
        info.funcCa(info.select[0].ca)
        info.funcDatav(info.select[0].validade)
    };


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
                <Modal.Header closeButton>
                    <Modal.Title>{info.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputTextDefault
                        info={{
                            id: info.idTipo,
                            placeholder: info.placeholderTipo,
                            func: info.funcTipo,
                            value: info.valueTipo
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idMarca,
                            placeholder: info.placeholderMarca,
                            func: info.funcMarca,
                            value: info.valueMarca
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idNome,
                            placeholder: info.placeholderNome,
                            func: info.funcNome,
                            value: info.valueNome
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idCa,
                            placeholder: info.placeholderCa,
                            func: info.funcCa,
                            value: info.valueCa
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idDatav,
                            placeholder: info.placeholderDatav,
                            func: info.funcDatav,
                            value: info.valueDatav
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={info.editar}>Editar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditar;