import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApis";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const FullNews = () => {
  const [newsCategory, setNewsCategory] = useState();
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery();
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews || isFetching) return <Loader />
  if (!cryptoNews.data || cryptoNews.data.length === 0) {
    console.log("No news available");
    return <div>No news available</div>;
  }

  console.log(newsCategory);

  const filteredNews = newsCategory
    ? cryptoNews.data.filter((news) =>
        news.title.toLowerCase().includes(newsCategory.toLowerCase())
      )
    : cryptoNews.data;

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return title;
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Select
          showSearch
          className="select-news"
          placeholder="Select a crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          filterOption={false}
        >
          <Option value="">All Cryptocurrencies</Option>
          {data?.data?.coins.map((coin) => (
            <Option key={coin.id} value={coin.name}>
              {coin.name}
            </Option>
          ))}
        </Select>
      </Col>

      {filteredNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-large-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img src={news?.thumbnail || demoImage} alt="News" />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}....`
                  : news.description}
              </p>

              <div className="provider-container">
                <div>
                  <Avatar src={news?.thumbnail || demoImage} alt="" />
                  <Text className="provider-name">
                    {truncateTitle(news.title)}
                  </Text>
                </div>
                <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FullNews;
