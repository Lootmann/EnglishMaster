type ModalProp = {
  isModalOpen: boolean;
  handleModal: (isOpened: boolean) => void;
  handleRefresh: () => void | undefined;
};

type DeleteModelType = {
  handleDelete: (e: eact.MouseEvent<HTMLInputElement, MouseEvent>) => void;
} & ModalProp;
