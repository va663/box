//封装webUploader;


// {
//     //选择按钮
//     picker: '#filePicker',
//     //上传按钮
//     uploadBtn: '#uploadBtn',
//     //回显div
//     showContainer: '.queueList',
//
//     //是否开启多选
//     multiple: true,
//     //是否可选重复文件
//     duplicate : trtue,
//     //是否自动上传
//     auto: true,
//
//     //设置文件上传域的name
//     fileVal:'file',
//     //文件上传请求的参数表，每次发送都会发送此对象中的参数。
//     fromData: {},
//
//     //类型描述
//     acceptTitle : '',
//         //允许的文件后缀，不带点，多个用逗号分割
//         acceptExtensions : '',
//     //可选的类型
//     acceptMimeTypes : '',
//
//     //验证文件总数量, 超出则不允许加入队列
//     fileNumLimit : 12,
//     //验证文件总大小是否超出限制
//     fileSizeLimit : 5 * 1024 * 1024,
//     //验证单个文件大小是否超出限制
//     fileSingleSizeLimit : 1 * 1024 * 1024,
//
//     //当文件被加入队列以后触发
//     onFileQueued : undefined,
//     //当文件被移除队列后触发
//     onFileDequeued: undefined,
//     //当validate不通过时，会以派送错误事件的形式通知调用者
//     onError: undefined,
//
//     //flash相关
//     swf: '${ctx}/js/webUploader/Uploader.swf',
//     //上传URL
//     server: '${ctx}/imageUploadServlet?type=' + $('#uploadType').val(),
// }


WebUploader.createSimpleUploader = function (options) {
    if (!WebUploader.Uploader.support()) {
        alert('图片上传不支持您的浏览器！如果你使用的是IE浏览器，请尝试升线flash');
        throw new Error('WebUploader does not support the browser you are using.');
    }

    var
        //图片选择按钮
        $picker = options.picker,

        // 上传按钮
        $uploadBtn = $(options.uploadBtn),

        //图片回显容器
        $showContainer = $(options.showContainer),

        // 状态栏，包括进度和控制按钮
        $statusBar = options.statusBar;


    //如果自动提交则屏蔽上传按钮
    if(options.auto)
        $uploadBtn.css({'display':'none','disable':true});
    else {
        //上传按钮默认样式
        $uploadBtn.css({
            'position': 'relative',
            'display': 'inline-block',
            'cursor': 'pointer',
            'background': '#2eaa65',
            'padding': '10px 15px',
            'color': '#fff',
            'text-align': 'center',
            'border-radius': '3px',
            'overflow': 'hidden',
        }).hover(function () {
            $uploadBtn.css('background','#1e9900');
        },function () {
            $uploadBtn.css('background','#2eaa65');
        }).click(function () {
            uploader.upload();
        });
    }

    //uploader实例
    var uploader = WebUploader.create({
        //flash相关
        swf: options.swf,
        //上传URL
        server: options.server,

        //设置文件上传域的name
        fileVal: options.fileVal ? options.fileVal : 'file',

        //文件上传请求的参数表，每次发送都会发送此对象中的参数。
        fromData: options.formData,

        //选择文件按钮容器
        pick: {
            //选择文件按钮
            id: $picker,
            //按钮文字
            innerHTML: options.pickerName ? options.pickerName : '选择文件',
            //是否开启多选
            multiple: options.multiple
        },

        //指定接受的文件类型
        accept: {
            //类型描述
            title: options.acceptTitle,
            //允许的文件后缀，不带点，多个用逗号分割
            extensions: options.acceptExtensions,
            mimeTypes: options.acceptMimeTypes
        },

        //配置生成缩略图的选项
        thumb: {
            width: 110,
            height: 110,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,
            // 是否允许裁剪。
            crop: true,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: ''
        },

        // 配置压缩的图片的选项。如果此选项为false, 则图片在上传前不进行压缩。
        compress: options.compress ? options.compress : {
            width: 1600,
            height: 1600,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 90,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,
            // 是否允许裁剪。
            crop: false,
            // 是否保留头部meta信息。
            preserveHeaders: true,
            // 如果发现压缩后文件大小比原来还大，则使用原来图片
            // 此属性可能会影响图片自动纠正功能
            noCompressIfLarger: false,
            // 单位字节，如果图片大小小于此值，不会采用压缩。
            compressSize: 0
        },

        //设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
        auto: options.auto,

        //指定Drag And Drop拖拽的容器，如果不指定，则不启动。
        dnd: options.dnd,

        //指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为document.body.
        paste: document.body,

        //指定运行时启动顺序。默认会想尝试 html5 是否支持，如果支持则使用 html5, 否则则使用 flash.
        //可以将此值设置成 flash，来强制使用 flash 运行时
        // runtimeOrder :

        //是否允许在文件传输时提前把下一个文件准备好。[默认值：false]
        //prepareNextFile :

        //[默认值：false] 是否要分片处理大文件上传。
        chunked: true,
        //如果要分片，分多大一片？ 默认大小为5M.
        chunkSize: 5242880,
        //[默认值：2] 如果某个分片由于网络问题出错，允许自动重传多少次
        chunkRetry: 2,

        disableGlobalDnd: true,
        //去重，是否允许选择相同的文件（根据文件名字、文件大小和最后修改时间来生成hash Key）.
        duplicate: options.duplicate == undefined ? true : options.duplicate,

        //验证文件总数量, 超出则不允许加入队列。
        fileNumLimit: options.fileNumLimit ? options.fileNumLimit : 12,
        //验证文件总大小是否超出限制
        fileSizeLimit: options.fileSizeLimit ? options.fileSizeLimit : 5 * 1024 * 1024,
        //验证单个文件大小是否超出限制
        fileSingleSizeLimit: options.fileSingleSizeLimit ? options.fileSingleSizeLimit : 1 * 1024 * 1024,

        //当文件被加入队列以后触发
        onFileQueued: function (file) {
            if (options.onFileQueued) {
                options.onFileQueued(file, uploader);

                //如果是图片才预览
            } else if (/image\/.*/i.test(file.type)) {
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        alert('预览错误');
                        return;
                    }

                    var imgDiv = $('<div style ="float:left;padding: 10px 10px 10px 10px" ></div>');
                    var img = $('<img id="' + file.id + '" title=' + file.name + ' src="' + src + '"><br/>');
                    var removeEle = $('<span style="color: red">删除</span>').click(function () {
                        uploader.removeFile(file);
                        imgDiv.remove();
                    });

                    imgDiv.append(img);
                    imgDiv.append(removeEle);
                    $showContainer.append(imgDiv);

                });
            }
        },

        //当一批文件添加进队列以后触发
        onFilesQueued: options.onFilesQueued,

        //当文件被移除队列后触发
        onFileDequeued: function (file) {
            if (options.onFileDequeued) {
                options.onFileDequeued(file);
            }
        },

        //当 uploader 被重置的时候触发
        onReset: options.onReset,

        //当开始上传流程时触发
        onStartUpload: options.onStartUpload,
        //某个文件开始上传前触发，一个文件只会触发一次
        onUploadStart: options.onUploadStart,
        //当开始上传流程暂停时触发
        onStopUpload: options.onStopUpload,

        //当所有文件上传结束时触发
        onUploadFinished: options.onUploadFinished,

        //当文件上传成功时触发(file,response)
        onUploadSuccess: options.onUploadSuccess,

        //当文件上传出错时触发(file,reason)
        onUploadError: options.onUploadError,

        //当validate不通过时，会以派送错误事件的形式通知调用者
        onError: function (errCode) {
            if (options.onError) {
                options.onError(errCode);
            } else {
                alert('文件不符合：' + errCode);
            }
        }
    });

    return uploader;
}

