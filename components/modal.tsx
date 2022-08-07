import { Modal } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  children: JSX.Element[] | JSX.Element;
  footer?: JSX.Element;
  onClickClose: () => void;
}

export const CustomModal = ({
  show,
  children,
  footer,
  onClickClose,
}: ModalProps): JSX.Element => {
  return (
    <Modal show={show} onHide={onClickClose} centered>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};
