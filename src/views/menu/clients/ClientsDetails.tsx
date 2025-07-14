import { useLocation } from "react-router-dom";
import LoadingModal from "../../../modals/LoadingModal";
import { useFetchClient } from "../../hooks/clients/useFetchClient";
import ClientsPreview from "./ClientsPreview";

const ClientsDetails = () => {
  const location = useLocation();
  const clientId = location.state;

  const {
    data: clientData,
    isFetching: isClientFetching,
    isError: isFetchClientError,
    error: fetchClientError,
  } = useFetchClient(clientId);


  return (
    <div>
      {isClientFetching && <LoadingModal />}
      {isFetchClientError && (
        <p className="error-message">{fetchClientError.message}</p>
      )}

      {clientData && <ClientsPreview imageUrl={clientData?.logo} />}
    </div>
  );
};

export default ClientsDetails;
