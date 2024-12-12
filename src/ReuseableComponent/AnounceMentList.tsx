import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pagination } from "antd";
import { listAnouncementsApi } from "../store/Services";

dayjs.extend(relativeTime);
const AnounceMentList = ({ refetchList, setRefetchList }: any) => {
  const [annoucementList, setAnnoucementList]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const fetchListAnouncementApi = () => {
    listAnouncementsApi({
      query: {
        page: currentPage,
      },
    })
      .then((res: any) => {
        setTotalPages(res?.total_pages || 0);
        setAnnoucementList(res?.results);
      })
      .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    fetchListAnouncementApi();
  }, [currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (refetchList) {
      setCurrentPage(1);
      fetchListAnouncementApi();
      setRefetchList(false);
    }
  }, [refetchList]);

  return (
    <>
      <div className="all-employees anouncement-table">
        <h3>List of Anouncements:</h3>
        <table>
          <thead>
            <tr>
              <th style={{ borderRight: "1px solid #fff" }}>Created At</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {annoucementList?.map((item: any) => (
              <tr key={item?.id}>
                <td>{dayjs(item?.created_at).format("DD-MM-YYYY hh:mm A")}</td>
                <td>{item?.title}</td>
                <td>{item?.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          onChange={onPageChange}
          showSizeChanger={false}
          align="center"
        />
      )}
    </>
  );
};

export default AnounceMentList;
