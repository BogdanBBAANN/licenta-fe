import React from "react";
import { List, Card,Button } from 'antd';
import {Link} from 'react-router-dom';
import './NoteListLayout.css';
import {BoxPlotFilled} from "@ant-design/icons";


const dateStyle = {
    'text-align': 'center'
}

const monthNames = ["January ", "February ", "March ", "April ", "May ", "June ",
  "July ", "August ", "September ", "October ", "November ", "December "
];

const NoteListLayout = (props) => {

    return(
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
              <div id={'datee'}>{item.date.toLocaleString().split('-')[2].charAt(0) === '0' ?
              item.date.toLocaleString().split('-')[2].charAt(1) : <></>
              } {item.date.toLocaleString().split('-')[1].charAt(0) === '0' ?
              monthNames[item.date.toLocaleString().split('-')[1].charAt(1) - 1] :
              monthNames[item.date.toLocaleString().split('-')[1] - 1]}
               { item.date.toLocaleString().split('-')[0]}
              </div>
            <Card
                title={
                    item.title
                }
            >
                {item.content}
            </Card>
              <Link to={{pathname: `/api/details/${item.id}`}}>
                  <Button className="mybutton">  Details </Button>
              </Link>
              <Link to={{pathname: `/api/update/${item.id}`}}>
                  <Button className="mybutton">  Update </Button>
              </Link>
          </List.Item>
        )}
      />
    );
}

export default NoteListLayout;