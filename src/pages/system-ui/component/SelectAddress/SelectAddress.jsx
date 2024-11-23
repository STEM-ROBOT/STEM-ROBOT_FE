import "./SelectAddress.css";
const SelectAddress = ({
  label,
  setArea,
  Area,
  Province,

  AreaData,
  ProvinceData,
  DistrictData,
  SchoolData,

  setProvince,
  setidDistrict,
  setSchool,
  setDistrictId,

  setDistrict,
  setProvinceData,
  setDistrictData,
  setSchoolData,
  setAreams,
  setProvincems,
  setMsAddress,
  setIdShool,

  setIdArea,
  setIdCity,
  setIdDistrict,
  setSchooltag,
  setDistrictag,
  setProvincetag,
}) => {
  const handleCity = (event) => {
    const ProvinceId =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-province-id"
      );
    const ProvinceName = event.target.value;
    setProvince(ProvinceName);
    setIdCity(ProvinceId);

    setDistrict(null);
    setSchool(null);

    setDistrictData([]);
    setSchoolData([]);

    setDistrictag(2);
    setidDistrict(100000);
    // setMsAddress(false);
  };
  const handleDistrict = (event) => {
    const DistrictId =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-district-id"
      );
    const DistrictName = event.target.value;
    setDistrict(DistrictName);

    setIdDistrict(DistrictId);

    setSchool(null);

    setSchoolData([]);

    setSchooltag(2);
    // setMsAddress(false);
  };
  const handleSchool = (event) => {
    const SchoolId =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-school-id"
      );
    const SchoolName = event.target.value;
    setSchool(SchoolName);

    setIdShool(SchoolId);

  };

  return (
    <div className="select-address-log1">
      {label === "Tỉnh/Thành Phố" && (
        <select className="select-address" onChange={handleCity}>
          <option
            value=""
            className="select-options sources"
          >{`--Chọn ${label}`}</option>
          {ProvinceData?.map((result) => (
            <option key={result.id} value={result} data-province-id={result.id}>
              {result.name}
            </option>
          ))}
        </select>
      )}
      {label === "Huyện/Quận" && (
        <select className="select-address" onChange={handleDistrict}>
          <option
            value=""
            className="select-options sources"
          >{`--Chọn ${label}--`}</option>
          {DistrictData?.map((result) => (
            <option key={result.id} value={result} data-district-id={result.id}>
              {result.name}
            </option>
          ))}
        </select>
      )}

      {label === "Trường của bạn" && (
        <select
          className="select-address"
          onChange={handleSchool}
        >
          <option
            value=""
            className="select-options sources"
          >{`--Chọn ${label}--`}</option>
          {SchoolData?.map((result) => (
            <option key={result.Id} value={result} data-school-id={result.id}>
              {result.schoolName}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
export default SelectAddress;
