import React, { Component } from 'react';
import { Menu, Input, Dropdown, Icon } from '@icedesign/base';
import './ContentMenu.scss';
//import { middleMenuConfig } from '../../../middleMenuConfig';
import middleMenuConfig from './../../middleMenuConfig';
import  { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router-dom';


export default class ContentMenu extends Component {
  static propTypes = {};
  
  constructor(props) {
    super(props);
   
    this.state = {
      openKeys: ['1', '2', '3'],
    };
  }
  
  handleOpen = (openKeys) => {
    this.setState({
      openKeys,
    });
  };
  
  handleClick = (openKeys) => {
    this.setState({
      openKeys,
    });
  };

  addItem = () => {
    console.log('添加item')
    let firstName ;
    firstName=prompt("输入名称");
    if(firstName==null){
      alert('未添加');
    }else{
      alert('添加'+firstName);
    }
    

  };

  double = () => {

    alert('双击');
/** 
    let count;
    count += 1;
    setTimeout(() => {
      if (count === 1) {
        alert('单击');
      } else if (count === 2) {
        alert('双击');
      }
      count = 0;
    }, 300);
   */
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>任务</h3>
          <div style={styles.more}>
            <Dropdown
              triggerType="click"
              trigger={<Icon type="add" size="small" style={styles.addIcon} />}
            >
              <Menu>
                <Menu.Item  onClick={this.addItem}>添加一级</Menu.Item>
                <Menu.Item  onDoubleClick={this.double}>添加二级</Menu.Item>
                <Menu.Item>添加三级</Menu.Item>
                <Menu.Item>添加四级</Menu.Item>
              </Menu>
            </Dropdown>
          </div>
        </div>
        <div style={styles.searchArea}>
          <Icon type="search" size="xs" style={styles.searchIcon} />
          <Input
            style={styles.searchInput}
            size="large"
            placeholder="搜索任务"
          />
        </div>
        {/* 一级menu */}
        <Menu
          onOpen={this.handleOpen}
          style={styles.menu}
          className="content-menu"
          openKeys={this.state.openKeys}
        >

                 
          {/* 二级menu */}
          <Menu.SubMenu label="甲板机械" key="4">
             {Array.isArray(middleMenuConfig) &&
              middleMenuConfig.length > 0 &&
              middleMenuConfig.map((nav, index) => {
                return(
                  /** 注意这里在用nav调用的时候一定要用大括号，不能用等于号*/
                  <Menu.SubMenu

                    contextmenu={this.double}
                    label={nav.name} key={index}>   
{/**
                  {nav.children.map((item,index1) => {     
                      const linkProps = {};
 
                      return (
                        <Menu.Item key={item.name}>{item.name}</Menu.Item> //在这个地方注意key的用法
                      );
                    })}
 */ }                
                    {nav.children.map((item) => {     
                      const linkProps = {};
                      if (item.newWindow) {
                        linkProps.href = item.path;    
                        linkProps.target = '_blank';
                      } else if (item.external) {
                        linkProps.href = item.path;
                      } else {
                        linkProps.to = item.path;
                      }
                      return (

                         /** 三级menu */
                        <Menu.Item key={item.name}>
                                <Link {...linkProps}>{item.name}</Link>
                        </Menu.Item>
                      );
                    })}
                    
              
                  </Menu.SubMenu>
                )

              }
              ) }

            {/* <Menu.SubMenu label="锚机" key="5">
                <Menu.SubMenu label="1" key="9">
                  <Menu.Item key="3">任务日历</Menu.Item> 
                </Menu.SubMenu>

                <Menu.SubMenu label="2" key="10">
                </Menu.SubMenu>
            </Menu.SubMenu> */}
            
            

            

          </Menu.SubMenu>

        </Menu>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fff',
    borderRight: '1px solid #ddd',
  },
  menu: {
    width: '240px',
    boxShadow: 'none',
  },
  header: {
    position: 'relative',
    padding: '0 20px',
  },
  title: {
    margin: '15px 0',
    fontWeight: '500',
  },
  more: {
    position: 'absolute',
    right: '20px',
    top: '0px',
    cursor: 'pointer',
  },
  addIcon: {
    color: '#ddd',
  },
  searchArea: {
    position: 'relative',
    textAlign: 'center',
  },
  searchInput: {
    width: '200px',
    height: '36px',
    lineHeight: '36px',
    borderRadius: '50px',
    background: '#f3f3f3',
    border: '0px',
    paddingLeft: '16px',
  },
  searchIcon: {
    position: 'absolute',
    left: '30px',
    top: '10px',
    color: '#8f8f8f',
  },
  taskCount: {
    background: '#ff5b57',
    color: '#fff',
    position: 'absolute',
    top: '7px',
    right: '16px',
    height: '16px',
    lineHeight: '16px',
    minWidth: '22px',
    textAlign: 'center',
    borderRadius: '14px',
  },
};
