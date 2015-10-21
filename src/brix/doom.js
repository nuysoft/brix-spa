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
    [],
    function() {
        return {
            // 备选方法名 doom|ava
            /*
                DOOM 
             */
            manage: function(holder, ghost) {
                if (!holder.on) return this

                holder.on('destroy', function() {
                    var by = ' by SPA.DOOM because it\'s holder is destroying'

                    // Ajax
                    if (ghost.state && (ghost.state() === 'pending') &&
                        ghost.abort) {
                        ghost.abort(ghost, 'be canceled' + by, holder)
                    }

                    // 实例
                    if (ghost.destroy) {
                        ghost.destroy(ghost, 'be destroyed' + by, holder)
                    }
                })
                return this
            }
        }
    }
)