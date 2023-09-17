// 滑动条，实时更新失败
class MyScroller extends eui.Component{
    constructor(snakeList: Snake[]){
        super();
        this.snakeList = snakeList;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private snakeList : Snake[];
    private myScroller : eui.Scroller;
    public snakeScoreList : eui.List;
    private init(){
        let snakeScoreList = this.snakeScoreList;
        if ( snakeScoreList == null){
            snakeScoreList = new eui.List();
            this.snakeScoreList = snakeScoreList;
        }
        let myScroller = this.myScroller;
        if (myScroller == null){
            myScroller = new eui.Scroller;
            this.myScroller = myScroller;
        }

        // 滑动列表背景
        let bg = new egret.Shape();
        bg.graphics.beginFill(0xff00ff, 0.1);
        bg.graphics.drawRect(700, 10, 1000, 300);
        bg.graphics.endFill();
        this.addChild(bg);

        // 填充数据
        let data : Array<Object> = [];
        for(let i = 0; i < this.snakeList.length; i++){
            data.push({rank: i, name: this.snakeList[i].snakeName, score: this.snakeList[i].score})
        }
        snakeScoreList.dataProvider = new eui.ArrayCollection(data);
        snakeScoreList.itemRenderer = ListDisplay;
        this.addChild(snakeScoreList);

        // // 设置布局
        // let layout = new eui.VerticalLayout();
        // layout.verticalAlign = egret.VerticalAlign.TOP;
        // layout.useVirtualLayout = true;
        // snakeScoreList.layout = layout;


        // // 子项可点击
        // snakeScoreList.selectedIndex = 1;
        // // 取消多选
        // snakeScoreList.allowMultipleSelection = false;
        // snakeScoreList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick, this);

        // 滚动条
        myScroller.x = 700;
        myScroller.y = 0;
        myScroller.width = 300;
        myScroller.height = 300;
        myScroller.viewport = snakeScoreList;
        this.addChild(myScroller);
        // 滚动条显示策略
        myScroller.horizontalScrollBar.autoVisibility = true;
        myScroller.verticalScrollBar.visible = false;
    }
    // // 展示弹窗
    // private onClick(e:eui.PropertyEvent){
    //     let popup = new Popup();
    //     popup.popupTx.text = "欢迎加入" + this.schoolList.selectedItem.name;
    //     this.addChild(popup);
    //     this.schoolList.selectedItem.num += 1;
    //     console.log(this.schoolList.selectedItem.name, this.schoolList.selectedItem.num);
    // }
}


class ListDisplay extends eui.ItemRenderer{
    private rank : eui.Label;
    private nameTx : eui.Label;
    private scoreTx : eui.Label;
    public constructor(){
        super();
    }

    protected createChildren(){
        // 设置子项可否点击
        this.touchEnabled = false;

        this.width = 300;
        this.height = 100;
        // 对子项进行布局
        super.createChildren();
        // 删除自带元素
        this.removeChildren();
        
        // 排名
        this.rank = new eui.Label();
        this.rank.x = 0;
        this.rank.y = 25;
        this.rank.size = 40;
        this.rank.textColor = 0x00ff00;
        this.addChild(this.rank);
        // 蛇名
        this.nameTx = new eui.Label();
        this.nameTx.x = 50;
        this.nameTx.y = 25;
        this.nameTx.size = 40;
        this.nameTx.textColor = 0x00ff00;
        this.addChild(this.nameTx);
        // 蛇得分
        this.scoreTx = new eui.Label();
        this.scoreTx.x = 220;
        this.scoreTx.y = 25;
        this.scoreTx.size = 40;
        this.scoreTx.textColor = 0x00ff00;
        this.addChild(this.scoreTx);
    }
    protected dataChanged(){
        super.dataChanged();
        // 判断是否为空
        if(this.data){
            // this.rank.text = '0.';
            this.scoreTx.text = this.data.score;
        }
        if(this.data && this.data.name){
            this.nameTx.text = this.data.name;
        }
    }
    // 处理属性的变化，实现子项文本实时更新
    public commitProperties(){
        super.commitProperties();
    }
}