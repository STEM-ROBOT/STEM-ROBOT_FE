import "./SelectAddress.css";
const SelectAddress = ({
  label,
  setArea,
  Area,
  Province,

  setIdArea,
  setProvince,
  setidDistrict,

  setSchooltag,
  setDistrictag,
  setProvincetag,

  setProvinceData,
  setDistrictData,
  setIdCity,
  setAreams,
  setProvincems,


  setMsAddress,
}) => {

  const handleArea = (event) => {
    const areaId =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-area-id"
      );
    const AreaName = event.target.value;
    setIdArea(areaId);
    setProvince(null);
    setProvincetag(2);
    setDistrictag(2);
    setSchooltag(2)
    setIdCity(1000000);

  };
  const handleCity = (event) => {
    const ProvinceId =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-province-id"
      );
    const ProvinceName = event.target.value;
    setCity(ProvinceName);
    setidCity(ProvinceId);
    setDistrict(null);
    setDistrictag(2);
    setWardag(2);
    setidDistrict(1000);
    setMsAddress(false);
  };
  // const handleDistrict = (event) => {
  //   const DistrictId =
  //     event.target.options[event.target.selectedIndex].getAttribute(
  //       "data-district-id"
  //     );
  //   const DistrictName = event.target.value;
  //   setDistrict(DistrictName);
  //   setidDistrict(DistrictId);
  //   setWard(null);
  //   setWardag(2);
  //   setMsAddress(false);
  // };
  // const handleWard = (event) => {
  //   const WardName = event.target.value;
  //   setWard(WardName);
  //   setMsAddress(false);
  // };

  return (
    <div className="select-address-log1">
      {label === "Khu Vực" && (
        <select className="select-address" onChange={handleArea}>
          <option
            value=""
            className="select-options sources"
          >{`--Chọn ${label}`}</option>
          {Area?.map((result) => (
            <option
              key={result.id}
              value={result.name}
              data-area-id={result.id}
            >
              {result.name}
            </option>
          ))}
        </select>
      )}
      {label === "Tỉnh/Thành Phố" && (
        <select className="select-address" onChange={handleCity}>
          <option
            value=""
            className="select-options sources"
          >{`--Chọn ${label}`}</option>
          {Province?.map((result) => (
            <option
              key={result.id}
              value={result.name}
              data-province-id={result.id}
            >
              {result.name}
            </option>
          ))}
        </select>
      )}
      {label === "Huyện/Quận" && (
        <select
          className="select-address"
          // onChange={handleDistrict}
        >
          <option
            value=""
            className="select-options sources"
          >{`--Chọn ${label}--`}</option>
          {/* {DistrictData.map((result) => (
            <option
              key={result.district_id}
              value={result.district_name}
              data-district-id={result.district_id}
            >
              {result.district_name}
            </option>
          ))} */}
        </select>
      )}

      {label === "Trường của bạn" && (
        <select
          className="select-address"
          // onChange={handleWard}
        >
          <option
            value=""
            className="select-options sources"
          >{`--Chọn ${label}--`}</option>
          {/* {WardData.map((result) => (
            <option
              key={result.ward_id}
              value={result.ward_name}
              data-ward-id={result.ward_id}
            >
              {result.ward_name}
            </option>
          ))} */}
        </select>
      )}
    </div>
  );
};
export default SelectAddress;
