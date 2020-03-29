import React, {Component} from 'react'
import {Card, List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {BASE_IMG_URL} from '../../../config/constant'
import {reqCategory} from "../../../api";

const Item = List.Item;
const Meta = Item.Meta;
export default class ProductDetail extends Component {
    state = {
        CNameParent: '',
        CNameChild: ''
    };

    async componentDidMount() {
        const {pCategoryId, categoryId} = this.props.location.state.product;

        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId);
            const CNameParent = result.data.name;
            this.setState({CNameParent})
        } else {
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
            const CNameParent = results[0].data.name;
            const CNameChild = results[1].data.name;
            this.setState({
                CNameParent,
                CNameChild
            })
        }
    }

    render() {
        const title = (
            <span>
        <a>
         <ArrowLeftOutlined
             type='arrow-left'
             style={{marginRight: 10, fontSize: 20}}
             onClick={() => this.props.history.goBack()}
         />
        </a>

        <span>商品详情</span>
      </span>
        );
        const {name, desc, price, detail, imgs} = this.props.location.state.product;
        const {CNameChild, CNameParent} = this.state
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <Meta title={<span>商品名称：</span>}/>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>{CNameParent} {CNameChild ? ' --> ' + CNameChild : ''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
              {
                  imgs.map(img => (
                      <img
                          key={img}
                          src={BASE_IMG_URL + img}
                          className="product-img"
                          style={{width: 150}}
                          alt="img"
                      />
                  ))
              }
            </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
                    </Item>

                </List>
            </Card>
        )
    }
}