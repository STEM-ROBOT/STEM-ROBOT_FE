import React, { useEffect, useState } from "react";
import api from "../../../../config";
import "./SchoolAccount.css";
import SelectAddress from "../SelectAddress/SelectAddress";

const SchoolAccount = () => {
  //Dữ liệu dùng để lưu
  const [Area, setArea] = useState(null);
  const [Province, setProvince] = useState(null);
  const [District, setDistrict] = useState(null);
  const [School, setSchool] = useState(null);
  //Data để select chọn ID
  const [AreaData, setAreaData] = useState([]);
  const [ProvinceData, setProvinceData] = useState([]);
  const [DistrictData, setDistrictData] = useState([]);
  const [SchoolData, setSchoolData] = useState([]);
  //ID để select theo phạm vi
  const [IdArea, setIdArea] = useState();
  const [IdCity, setIdCity] = useState();
  const [IdDistrict, setIdDistrict] = useState();
  const [IdShool, setIdShool] = useState();
  //
  const [Provincetag, setProvincetag] = useState(1);
  const [Districtag, setDistrictag] = useState(1);
  const [Schooltag, setSchooltag] = useState(1);
  //Thống báo khi chưa chọn
  const [Areams, setAreams] = useState(null);
  const [Provincems, setProvincems] = useState(null);
  const [Districtms, setDistrictms] = useState(null);
  const [Schoolms, setSchoolms] = useState(null);

  useEffect(() => {
    const ApiArea = () => {
      api
        .get("/api/areas/area")
        .then((response) => {
          console.log(response);

          const result = response.data.data;
          setAreaData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (Area == null) {
      ApiArea();
    }
  }, [Area]);

  useEffect(() => {
    const apiProvince = () => {
      api
        .get(`/api/areas/province/areaId?areaId=${IdArea}`)
        .then((response) => {
          const result = response.data.data;
          setProvinceData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (Provincetag == 2) {
      apiProvince();
      setProvincetag(1);
    }
  }, [Provincetag]);
  useEffect(() => {
    const apiDistrict = () => {
      api
        .get(`/api/areas/district/provinceId?provinceId=${IdCity}`)
        .then((response) => {
          const result = response.data.data;
          setDistrictData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (Districtag == 2) {
      apiDistrict();
      setDistrictag(1);
    }
  }, [Districtag]);
  useEffect(() => {
    const apiShool = () => {
      api
        .get(`/api/areas/school/districtId?districtId=${IdDistrict}`)
        .then((response) => {
          const result = response.data.data;
          setSchoolData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (Schooltag == 2) {
      apiShool();
      setSchooltag(1);
    }
  }, [Schooltag]);
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
    setSchool([]);

    setDistrictag(2);
    setidDistrict(100000);
    // setMsAddress(false);
  };
  return (
    <div className="school_layout">
      <SelectAddress
        label="Khu Vực"
        // data hiển thị
        AreaData={AreaData}
        //luu lua chon cua nguoi dung
        setIdArea={setIdArea}
        setArea={setArea}
        //reset lua chon cap duoi
        setProvince={setProvince}
        setDistrict={setDistrict}
        setSchool={setSchool}
        setProvinceData={setProvinceData}
        setDistrictData={setDistrictData}
        setSchoolData={setSchoolData}
        setIdCity={setIdDistrict}
        setIdDistrict={setIdDistrict}
        //reset du lieu
        setSchooltag={setSchooltag}
        setDistrictag={setDistrictag}
        setProvincetag={setProvincetag}
      />

      <SelectAddress
        label="Tỉnh/Thành Phố"
        // data hiển thị
        ProvinceData={ProvinceData}
        //luu lua chon cua nguoi dung
        setIdCity={setIdCity}
        setProvince={setProvince}
        //reset lua chon cap duoi
        setDistrict={setDistrict}
        setSchool={setSchool}
        setDistrictData={setDistrictData}
        setSchoolData={setSchoolData}
        setIdDistrict={setIdDistrict}
        //reset du lieu
        setSchooltag={setSchooltag}
        setDistrictag={setDistrictag}
      />

      <SelectAddress
        label="Huyện/Quận"
        DistrictData={DistrictData}
        //luu lua chon cua nguoi dung
        setIdDistrict={setIdDistrict}
        setDistrict={setDistrict}
        //reset lua chon cap duoi
        setSchool={setSchool}
        setSchoolData={setSchoolData}
        //reset du lieu
        setSchooltag={setSchooltag}
      />
      <SelectAddress
        label="Trường của bạn"
        SchoolData={SchoolData}
        //luu lua chon cua nguoi dung
        setIdShool={setIdShool}
        setSchool={setSchool}
      />
    </div>
  );
};

export default SchoolAccount;
