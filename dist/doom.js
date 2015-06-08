
/* global define */
/* jshint multistr:true */
/*
    毁灭公爵 - 必死无疑。
    1. 负责清理未完成的 Ajax 请求。
    2. 负责销毁托管的实例 
    	* 含有 destroy 方法
    	* Brix Component
    	* DOM Element
    
    * [DOOM 启示录](http://baike.baidu.com/view/468206.htm)
    * [机械姬 Ex Machina 2015]http://movie.douban.com/subject/4160540/
    * 联想到了 生死簿、阎王、牛头马面、黑白无常、鬼魂
 */
define(
    'brix/doom',[],
    function() {
        return {
            // 备选方法名 doom|ava
            manage: function(holder, ghost) {
                holder.on('destroy', function() {
                    var by = ' by DOOM when it\'s holder is destroyed'
                    if (ghost.abort) ghost.abort(ghost, 'be canceled' + by, holder)
                    if (ghost.destroy) ghost.destroy(ghost, 'be destroyed' + by, holder)
                })
                return this
            }
        }
    }
);