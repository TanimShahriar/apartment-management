import { Link } from "react-router-dom";


const AgreementRequest = () => {
  return (
    <div className="p-10 bg-slate-400 min-h-screen">
      <div className="flex justify-between">
        <Link to="/dashboard/userAgreeReq"><button className="btn btn-primary"><h2>Agreement request</h2></button></Link>
        <Link to="/dashboard/acceptedAgreement"><button className="btn btn-success"><h2>accepted</h2></button></Link>
        <Link to="/dashboard/rejectedAgreement"><button className="btn btn-warning"><h2>rejected</h2></button></Link>

      </div>
      <div className="divider"></div>

    </div>
  );
};

export default AgreementRequest;