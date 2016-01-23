$app.controller('ItemCtrl', function ($scope, $rootScope, $document, $cookies, $location, $routeParams, sv, $timeout, fileUpload) {
    $scope.alert = [];
    $scope.item = {};
    $scope.category = {};
    $scope.descriptions = {};
    $scope.subcategories = [];
    $scope.edit_mode = false;
    $scope.setFocus = {};
    $scope.image = {};
    $scope.file;

    $scope.changeSequence = function (i, data) {
        if (sv.checkResponse) {
            $scope.loadingSequence = true;
            sv.postWithKey('private/update/image/' + data.id, {
                sequence: data.sequence
            }).success(function (resp) {
                if (!resp.error) {
                    getImages();
                    $scope.loadingSequence = false;
                }
            });
        }
    }


    $scope.onFocus = function (campo) {
        setFocus(campo)
    };

    function setFocus() {
        $scope.setFocus = true;
        $timeout(function () {
            $scope.setFocus = false;
        }, 200);
    }

    $scope.id = ($routeParams.id ? $routeParams.id : false);
    if (!$scope.id) {
        $location.path('/home');
    }

    if (sv.checkResponse()) {
        sv.getWithKey('private/find/category/id/' + $scope.id).success(function (resp) {
            $scope.category = resp.json;

        });
    }

    $scope.newItem = function (notFocus) {
        $scope.edit_mode = true;
        $scope.edited_sequence = false;
        $scope.item = {};
        $scope.selectImage = null;
        $scope.descriptions.description = '';
        $scope.image = {};
        if (!notFocus) setFocus();
    }

    $scope.clearRecord = function () {
        $scope.item = {};
        $scope.edit_mode = false;
        $scope.edited_sequence = false;
    };

    $scope.listItems = function (notFocus) {
        $scope.edit_mode = false;
        $scope.edited_sequence = false;
    }

    $scope.editItem = function (i, notFocus) {
        $scope.recordIndex = i;
        $scope.edit_mode = true;
        $scope.edited_sequence = false;
        $scope.item = {};
        $scope.item = $scope.items[i];
        sv.getWithKey('private/find/description/id/' + $scope.items[i].id_description).success(function (resp) {
            $scope.descriptions.description = resp.json.description;

        });
        $scope.selectImage = '' + $scope.item.id;
        $scope.image = {};
        getImages();
        if (!notFocus) setFocus();
    };

    getSubCategories();
    $scope.getSubCategories = function () {
        getSubCategories(false);
    };

    function getSubCategories(reloadActiveRecord) {
        $scope.image = {};
        if (sv.checkResponse()) {
            sv.getWithKey('private/find/subcategory/id_category/' + $scope.id).success(function (resp) {

                if (!resp.error) {
                    $scope.subcategories = resp.json;
                    getItems();
                }
            });
        };
    }

    getItems();
    $scope.getItems = function () {
        getItems();
    };

    function getItems() {
        $scope.image = {};
        if (sv.checkResponse()) {
            sv.getWithKey('private/find/item/id_category/' + $scope.id).success(function (resp) {

                if (!resp.error) {
                    $scope.items = resp.json;
                    for (var i = 0; i < resp.json.length; i++) {
                        $scope.items[i].category_name = getNameSubCategory($scope.items[i].id_subcategory);
                    }
                }
            });
        };
    }

    $scope.getImages = function () {
        getImages();
    };

    function getImages() {
        $scope.image = {};
        if (sv.checkResponse()) {
            sv.getWithKey('private/find/image/id_item/' + $scope.item.id).success(function (resp) {
                if (!resp.error) {
                    $scope.images = resp.json;
                }
            });
        };
    }

    function getNameSubCategory(id) {
        for (var i = 0; i < $scope.subcategories.length; i++) {
            if (id == $scope.subcategories[i].id) {
                return $scope.subcategories[i].name;
                i = $scope.subcategories.length;
            }
        }
    }


    $scope.updateItem = function () {
        $scope.item.id_category = $scope.id;
        var id = $scope.item.id;
        var type = 'update';
        if (typeof id === 'undefined') {
            type = 'new';
            id = '';
        } else id = '/' + id;
        if (sv.checkResponse()) {
            sv.getWithKey('private/find/item/name/' + $scope.item.name).success(function (resp) {

                if (!resp.error && (id == '')) {
                    $scope.alert.push({
                        message: 'Já existe um registro com essa descrição.',
                        class: 'alert-warning',
                        error: !resp.error,
                        type: 'Oh não!',
                        icon: 'fa-warning'
                    });
                } else {
                    var id_description = '';
                    if (id != '') {
                        id_description = '/' + $scope.item.id_description;
                    }

                    sv.postWithKey('private/' + type + '/description' + id, $scope.descriptions).success(function (resp) {

                        if (!resp.error) {
                            $scope.alert.push({
                                message: resp.message,
                                class: 'alert-success',
                                error: resp.error,
                                type: 'Sucesso!',
                                icon: 'fa-check'
                            });
                            if (id_description != '') $scope.item.id_description = resp.json.id;

                            sv.postWithKey('private/' + type + '/item' + id, $scope.item).success(function (resp) {

                                if (resp.error) {
                                    $scope.alert.push({
                                        message: resp.message,
                                        class: 'alert-danger',
                                        error: resp.error,
                                        type: 'Ocorreu um erro :(',
                                        icon: 'fa-ban'
                                    });
                                } else {
                                    $scope.alert.push({
                                        message: resp.message,
                                        class: 'alert-success',
                                        error: resp.error,
                                        type: 'Sucesso!',
                                        icon: 'fa-check'
                                    });
                                    getSubCategories();
                                    if (type == 'new') $scope.item = {};
                                    else $scope.item = resp.json;
                                }
                            });
                        } else {
                            $scope.alert.push({
                                message: 'Ocorreu um erro ao enviar a descrição do Item',
                                class: 'alert-danger',
                                error: resp.error,
                                type: 'Ocorreu um erro :(',
                                icon: 'fa-ban'
                            });
                        }
                    });
                }
            });
        };
    };

    $scope.deleteItem = function (id) {
        if (sv.checkResponse()) {
            sv.delWithKey('private/delete/item/' + id).success(function (resp) {
                $scope.edit_mode = true;
                if (resp.error) {
                    $scope.alert.push({
                        message: resp.message,
                        class: 'alert-danger',
                        error: resp.error,
                        type: 'Ocorreu um erro :(',
                        icon: 'fa-ban'
                    });
                } else {
                    $scope.alert.push({
                        message: resp.message,
                        class: 'alert-success',
                        error: resp.error,
                        type: 'Sucesso!',
                        icon: 'fa-check'
                    });
                }
                getItems();
                $scope.item = {};
            });
        };
    };

    $scope.alert.remove = function (i) {
        $scope.alert.splice(i, 1);
    }

    $scope.upload = function () {
        $scope.loadingImageBox = true;
        var id = $scope.item.id;
        var chave = '/' + $rootScope.access.chave;
        var file = $scope.image.file;
        var uploadUrl = path_server + 'private/upload/image/' + id + chave;
        fileUpload.uploadFileToUrl(file, uploadUrl).success(function (resp) {
            $scope.edit_mode = true;
            if (resp.error) {
                $scope.alert.push({
                    message: resp.message,
                    class: 'alert-danger',
                    error: resp.error,
                    type: 'Ocorreu um erro :(',
                    icon: 'fa-ban'
                });
            } else {
                $scope.alert.push({
                    message: resp.message,
                    class: 'alert-success',
                    error: resp.error,
                    type: 'Sucesso!',
                });
                getSubCategories(true);
                $scope.loadingImageBox = false;
                $('#image-preview').html('');
                getImages();
            }
        });
    }

    $scope.deleteImage = function (id) {
        $scope.loadingImageBox = true;
        sv.postWithKey('private/image/delete/image/' + id).success(function (resp) {
            $scope.edit_mode = true;
            if (resp.error) {
                $scope.alert.push({
                    message: resp.message,
                    class: 'alert-danger',
                    error: resp.error,
                    type: 'Ocorreu um erro :(',
                    icon: 'fa-ban'
                });
            } else {
                $scope.alert.push({
                    message: resp.message,
                    class: 'alert-success',
                    error: resp.error,
                    type: 'Sucesso!',
                    icon: 'fa-check'
                });
                $scope.loadingImageBox = false;
                getImages();
            }
        });
    };


    $scope.updateAdditional = function () {
        var id = $scope.additional.id;
        var type = 'update';
        if (typeof id === 'undefined') {
            type = 'new';
            id = '';
        } else id = '/' + id;
        if (sv.checkResponse()) {
            sv.getWithKey('private/find/additional/name/' + $scope.additional.name).success(function (resp) {
                if (!resp.error) {
                    $scope.alert.push({
                        message: 'Já existe um registro com essa descrição.',
                        class: 'alert-warning',
                        error: !resp.error,
                        type: 'Oh não!',
                        icon: 'fa-warning'
                    });
                } else {
                    sv.postWithKey('private/' + type + '/additional' + id, $scope.additional).success(function (resp) {
                        if (resp.error) {
                            $scope.alert.push({
                                message: resp.message,
                                class: 'alert-danger',
                                error: resp.error,
                                type: 'Ocorreu um erro :(',
                                icon: 'fa-ban'
                            });
                        } else {
                            $scope.alert.push({
                                message: resp.message,
                                class: 'alert-success',
                                error: resp.error,
                                type: 'Sucesso!',
                                icon: 'fa-check'
                            });
                            getAdditionals();
                            if (type == 'new') $scope.additional = {};
                            else $scope.additional = resp.json;
                        }
                    });
                }
            });
        };
    };

    $scope.deleteAdditional = function (id) {
        if (sv.checkResponse()) {
            sv.delWithKey('private/delete/additional' + id).success(function (resp) {
                $scope.edit_mode = true;
                if (resp.error) {
                    $scope.alert.push({
                        message: resp.message,
                        class: 'alert-danger',
                        error: resp.error,
                        type: 'Ocorreu um erro :(',
                        icon: 'fa-ban'
                    });
                } else {
                    $scope.alert.push({
                        message: resp.message,
                        class: 'alert-success',
                        error: resp.error,
                        type: 'Sucesso!',
                        icon: 'fa-check'
                    });
                }
                getAdditionals();
                $scope.additional = {};
            });
        };
    };

    $scope.updateAdditionalItens = function () {
        var id = $scope.additionalItem.id;
        var type = 'update';
        if (typeof id === 'undefined') {
            type = 'new';
            id = '';
        } else id = '/' + id;
        if (sv.checkResponse()) {
            sv.getWithKey('private/find/additionalItem/name/' + $scope.additionalItem.description).success(function (resp) {
                if (!resp.error && (resp.json.id == $scope.additionalItem.id)) {
                    $scope.alert.push({
                        message: 'Já existe um registro com essa descrição.',
                        class: 'alert-warning',
                        error: !resp.error,
                        type: 'Oh não!',
                        icon: 'fa-warning'
                    });
                } else {
                    sv.postWithKey('private/' + type + '/additionalItem' + id, $scope.additionalItem).success(function (resp) {
                        if (resp.error) {
                            $scope.alert.push({
                                message: resp.message,
                                class: 'alert-danger',
                                error: resp.error,
                                type: 'Ocorreu um erro :(',
                                icon: 'fa-ban'
                            });
                        } else {
                            $scope.alert.push({
                                message: resp.message,
                                class: 'alert-success',
                                error: resp.error,
                                type: 'Sucesso!',
                                icon: 'fa-check'
                            });
                            getAdditionalItems();
                            if (type == 'new') $scope.additionalItem = {};
                            else $scope.additionalItem = resp.json;
                        }
                    });
                }
            });
        };
    };

    $scope.deleteAdditionalItem = function (id) {
        if (sv.checkResponse()) {
            sv.delWithKey('private/delete/additionalItem' + id).success(function (resp) {
                $scope.edit_mode = true;
                if (resp.error) {
                    $scope.alert.push({
                        message: resp.message,
                        class: 'alert-danger',
                        error: resp.error,
                        type: 'Ocorreu um erro :(',
                        icon: 'fa-ban'
                    });
                } else {
                    $scope.alert.push({
                        message: resp.message,
                        class: 'alert-success',
                        error: resp.error,
                        type: 'Sucesso!',
                        icon: 'fa-check'
                    });
                }
                getAdditionalItems();
                $scope.additionalItem = {};
            });
        };
    };





    getAdditionals();
    $scope.getAdditionals = function () {
        getAdditionals();
    };

    function getAdditionals() {
        if ($scope.item.id) {
            if (sv.checkResponse()) {
                sv.getWithKey('private/find/additional/id_item/' + $scope.item.id).success(function (resp) {
                    if (!resp.error) {
                        $scope.additionals = resp.json;
                    }
                });
            };
        }
    }

    getAdditionalItems();
    $scope.getAdditionalItems = function () {
        getAdditionalItems();
    };

    function getAdditionalItems() {
        if ($scope.item.id) {
            if (sv.checkResponse()) {
                sv.getWithKey('private/find/additionalitem/id_additional/' + $scope.item.id).success(function (resp) {
                    if (!resp.error) {
                        $scope.additionalsItems = resp.json;
                    }
                });
            };
        }
    }

});