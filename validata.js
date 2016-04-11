//添加事件
  function addEvent(o,e,fn){
    if(window.attachEvent){o.attachEvent("on"+e,fn)}
    else if(window.addEventListener){o.addEventListener(e,fn,false);}
    else {o["on"+e]=fn;}

  }


  //解绑事件
  function removeEvent(o,e,fn){
    if(window.detacEvent){o.detacEvent("on"+e,fn);}
    else if(removeEventListener){o.removeEventListener(e,fn,false);}
    else {o["on"+e]=null;}
  }
    //解除默认事件
  function stopDefault(e){
    if(e&&e.preventDefault){e.preventDefault();}
    else {window.event.returnValue=false}
    return false;
  }
  
  //阻止冒泡
  function stopBubble(e){
    if(e&&e.stopPropagation){e.stopPropagation;}
    else (window.event.cancelBubble=true)
  }
  //选择器
  function getID(el){
    return document.getElementById(el);
  }

  //入口
  addEvent(this,"submit",function(e)
    { 
      flag=true;
      var typeGet=document.getElementsByTagName("input");
      for(var i=0;i<typeGet.length;i++)
        { 
          if(typeGet[i].getAttribute('dataType')==undefined||typeGet[i].getAttribute('dataType')==null) continue; 
          var datatype=typeGet[i].getAttribute('dataType').split("-");
          var type=datatype[0];
          var len=datatype[1]||"[0,50]";
          var data=typeGet[i].value;
          var check=validataForm(data,type,len);
          if(check!=="OK"){
            e&&stopDefault(e);
            flag=false;
            //错误提示开始
            var _node=document.createElement("span");
            _node.className="errortip";
            typeGet[i].parentNode.appendChild(_node)
            _node.innerHTML=check;
            //错误提示结束
          }
          else if(datatype[1]=="Compare")
            typeGet[i].dataCompare(typeGet[i-1].value);
        }
        console.log(flag);
       if(flag) alert("success!") 
    })
    
  //数据格式验证
  function validataForm(value,valitype,leftlen,rightlen)
    { 
      var dataVali=
        {"email":{"vali":/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)?$/,"error":"Email地址填写错误"},
         "tel":{"vali":/^((0?1[358]\d{9})[,，]?|((0(10|2[0-9]{1}|[3-9]{1}\d{2})[-_－—]?)?\d{7,8})[,，]?)*$/,"error":"电话号码填写错误"},
          "mobile":{"vali":/^(0?1[358]\d{9})*$/,"error":"11位手机号码填写错误"},
          "url":{"vali":/^(http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)?$/,"error":"网址填写错误"},
          "number":{"vali":/^\d*$/,"error":"只能填写数字格式"},
          "english":{"vali":/^[A-Za-z]*$/,"error":"只能输入英文字母"},
          "chinese":{"vali":/^[\u0391-\uFFE5]*$/,"error":"只能输入中文"},
          "username":{"vali":/^[a-zA-Z]{1}\w*$/,"error":"帐号需由字母开头的"+"1-20位字母、数字或下划线组成"},
          "password":{"vali":/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]*$/,"error":"密码长度4-20,请勿输入特殊字符"},
           "date":{"vali":/^((\d{4})[\-|\.|\/](\d{1,2})[\-|\.|\/](\d{1,2}))?$/,"error":"请填写如2016-1-1格式日期！"}
        }
      
      var va=dataVali[valitype];
    
      if(value==""||!va.vali.test(value))
        return va.error;
      else return "OK";
      
    }

    //重复比较
    function dataCompare(type){
      console.log("compare OK");
    }

    Object.prototype.dataCompare=function(value){
      if(this.value==value)
      {console.log("compare OK");
            return true;}
      else 
        {console.log("compare 失败")
        this.parentNode.appendChild(document.createTextNode("重复输入不相同"))
         return false;}
    }