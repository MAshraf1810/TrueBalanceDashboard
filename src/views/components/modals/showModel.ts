export const showModal = (model_id: string) => {
  const model = document.getElementById(model_id) as HTMLDialogElement;
  if (model) {
    model.showModal();
  }
};
