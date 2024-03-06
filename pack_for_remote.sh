user=mangosteen
ip=server1

time=$(date +'%Y%m%d-%H%M%S')
deploy_dir=/home/$user/blog-deploy/
dist=dist.tar.gz

function title {
    echo
    echo "###############################################################################"
    echo "## $1"
    echo "###############################################################################"
    echo
}

title '打包代码'
mkdir -p $dist
rm -rf $dist
tar -czvf dist.tar.gz --exclude=./node_modules .

title '上传代码'
ssh $user@$ip "mkdir -p $deploy_dir"
scp $dist $user@$ip:$deploy_dir/
title '解压缩'
ssh $user@$ip "cd $deploy_dir; mkdir ./dist; tar xf dist.tar.gz --directory=./dist;"
