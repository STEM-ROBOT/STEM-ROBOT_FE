import React, { useEffect, useState } from "react";
import api from "../../../../config";
import "./SchoolAccount.css";
import SelectAddress from "../SelectAddress/SelectAddress";

const SchoolAccount = () => {
  const [Area, setArea] = useState(null);
  const [Province, setProvince] = useState(null);
  const [District, setDistrict] = useState(null);
  const [School, setSchool] = useState(null);

  const [AreaData, setAreaData] = useState([]);
  const [ProvinceData, setProvinceData] = useState([]);
  const [DistrictData, setDistrictData] = useState([]);
  const [SchoolData, setSchoolData] = useState([]);

  const [IdArea, setIdArea] = useState();
  const [IdCity, setIdCity] = useState();
  const [IdDistrict, setidDistrict] = useState();

  const [Provincetag, setProvincetag] = useState(1);
  const [Districtag, setDistrictag] = useState(1);
  const [Schooltag, setSchooltag] = useState(1);

  const [Areams, setAreams] = useState(null);
  const [Provincems, setProvincems] = useState(null);
  const [Districtms, setDistrictms] = useState(null);
  const [Schoolms, setSchoolms] = useState(null);

  useEffect(() => {
    api.get("/api/areas/area").then((response) => {
      console.log(response);

      const result = response.data.data;
      setAreaData(result);
    });
  }, []);

  useEffect(() => {
    console.log(IdArea);
    
    api.get(`/api/areas/province/areaId?areaId=${IdArea}`).then((response) => {
      const result = response.data.data;
      setProvince(result);
    });
  }, [Province]);
  // useEffect(() => {
  //   const apiDistrict = () => {
  //     api.get(`/api/areas/province?id=${IdCity}`).then((response) => {
  //       const result = response.data?.districts;
  //       setDistrictData(result);
  //     });
  //   };
  //   if (Districtag === 2) {
  //     apiDistrict();
  //     setDistrictag(1);
  //   }
  // }, [Districtag]);

  // useEffect(() => {
  //   const apiWard = () => {
  //     api.get(`/api/areas/district?id=${IdDistrict}`).then((response) => {
  //       const result = response.data.results;
  //       setWardData(result);
  //     });
  //   };
  //   if (Wardag === 2) {
  //     apiWard();
  //     setWardag(1);
  //   }
  // }, [Wardag]);
  return (
    <div className="school_layout">
      <SelectAddress
        label="Khu Vực"
        setArea={setArea}
        setProvince={setProvince}
        Area={AreaData}
        //id khu vuc
        setIdArea={setIdArea}
        //reset du lieu
        setSchooltag={setSchooltag}
        setDistrictag={setDistrictag}
        setProvincetag={setProvincetag}
        //reset Id
        setProvinceData={setProvinceData}
        setIdCity={setIdCity}
        //lay du li
        setAreams={setAreams}
      />

      <SelectAddress
        label="Tỉnh/Thành Phố"
        setProvince={setProvince}
        setIdCity={setIdCity}
        Province={Province}
        setDistrictag={setDistrictag}
        setSchooltag={setSchooltag}
        setDistrict={setDistrict}
        setDistrictData={setDistrictData}
        setidDistrict={setidDistrict}
        setProvincems={setProvincems}
      />

      <SelectAddress
        label="Tỉnh/Thành Phố"
        // setCity={setCity}
        // setidCity={setidCity}
        // Province={Province}
        // setDistrictag={setDistrictag}
        // setWardag={setWardag}
        // setDistrict={setDistrict}
        // setidDistrict={setidDistrict}
        // setMsAddress={setMsAddress}
      />
      <SelectAddress
        label="Huyện/Quận"
        // setCity={setCity}
        // setidCity={setidCity}
        // Province={Province}
        // setDistrictag={setDistrictag}
        // setWardag={setWardag}
        // setDistrict={setDistrict}
        // setidDistrict={setidDistrict}
        // setMsAddress={setMsAddress}
      />
      <SelectAddress
        label="Trường của bạn"
        // setCity={setCity}
        // setidCity={setidCity}
        // Province={Province}
        // setDistrictag={setDistrictag}
        // setWardag={setWardag}
        // setDistrict={setDistrict}
        // setidDistrict={setidDistrict}
        // setMsAddress={setMsAddress}
      />
    </div>
  );
};

export default SchoolAccount;
