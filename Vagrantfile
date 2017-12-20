Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
    config.vm.provision "shell", inline: <<-SHELL
      apt-get update
      yes Y | apt-get install build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev python-setuptools
      apt-add-repository ppa:brightbox/ruby-ng
      apt-get update
      yes Y | apt-get install ruby2.4
      yes Y | apt-get install ruby`ruby -e 'puts RUBY_VERSION[/\d+\.\d+/]'`-dev

      gem install sass --no-user-install

      sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"

      echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"' >>~/.profile
      echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"' >>~/.profile
      echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"' >>~/.profile
    SHELL
end
