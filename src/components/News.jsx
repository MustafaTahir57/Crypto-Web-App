import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = () => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery();

  console.log("cryptoNews:", cryptoNews);
  console.log("isFetching:", isFetching);

  if (!cryptoNews || isFetching) return <div>Loading ...</div>;
  if (!cryptoNews.data || cryptoNews.data.length === 0) {
    console.log("No news available");
    return <div>No news available</div>;
  }

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return title;
  };

  const limitedNews = cryptoNews.data.slice(0, 6); // Limit to first 6 articles

  return (
    <Row gutter={[24, 24]}>


      
      {limitedNews.map((news, i) => (
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

export default News;
