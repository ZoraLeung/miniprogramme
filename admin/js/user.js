(function() {
    const STORAGE_KEY = 'currentUser';
    const USERNAME_SELECTOR = '[data-role="current-username"]';
    const PROFILE_MODAL_ID = 'profileModal';

    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
        } catch (err) {
            console.warn('读取当前用户信息失败', err);
            return {};
        }
    }

    function getDisplayName(user) {
        if (!user) {
            return '未登录';
        }
        const name = (user.name || '').trim();
        if (name) {
            return name;
        }
        const username = (user.username || '').trim();
        return username || '未登录';
    }

    function getRoleLabel(role) {
        if (role === 'admin') {
            return '管理员';
        }
        if (role === 'operator') {
            return '操作员';
        }
        return role ? role : '未知角色';
    }

    function formatValue(text, fallback) {
        const value = (text || '').toString().trim();
        return value ? value : (fallback || '未设置');
    }

    function updateUsernameDisplay(user) {
        const displayName = getDisplayName(user);
        document.querySelectorAll(USERNAME_SELECTOR).forEach(function(node) {
            node.textContent = displayName;
            node.title = '点击退出登录';
        });
    }

    function ensureProfileModal() {
        let modal = document.getElementById(PROFILE_MODAL_ID);
        if (modal) {
            return modal;
        }

        modal = document.createElement('div');
        modal.id = PROFILE_MODAL_ID;
        modal.className = 'modal';
        modal.innerHTML = [
            '<div class="modal-content profile-modal">',
                '<div class="modal-header">',
                    '<h3 class="modal-title">个人信息</h3>',
                    '<button class="modal-close" type="button" data-action="close-profile">&times;</button>',
                '</div>',
                '<div class="modal-body">',
                    '<div class="profile-info">',
                        '<div class="profile-info-row">',
                            '<span class="profile-info-label">用户名</span>',
                            '<span class="profile-info-value" data-field="username">-</span>',
                        '</div>',
                        '<div class="profile-info-row">',
                            '<span class="profile-info-label">姓名</span>',
                            '<span class="profile-info-value" data-field="name">-</span>',
                        '</div>',
                        '<div class="profile-info-row">',
                            '<span class="profile-info-label">角色</span>',
                            '<span class="profile-info-value" data-field="role">-</span>',
                        '</div>',
                        '<div class="profile-info-row">',
                            '<span class="profile-info-label">登录时间</span>',
                            '<span class="profile-info-value" data-field="loginTime">-</span>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeProfileModal();
            }
        });

        const closeButton = modal.querySelector('[data-action="close-profile"]');
        if (closeButton) {
            closeButton.addEventListener('click', closeProfileModal);
        }

        document.body.appendChild(modal);
        return modal;
    }

    function populateProfileModal(user) {
        const modal = ensureProfileModal();
        modal.querySelector('[data-field="username"]').textContent = formatValue(user.username, '未登录');
        modal.querySelector('[data-field="name"]').textContent = formatValue(user.name, '未设置');
        modal.querySelector('[data-field="role"]').textContent = getRoleLabel(user.role);
        modal.querySelector('[data-field="loginTime"]').textContent = formatValue(user.loginTime, '未知');
    }

    function showProfileModal() {
        const currentUser = getCurrentUser();
        populateProfileModal(currentUser);

        const modal = ensureProfileModal();
        modal.style.display = 'block';
        document.addEventListener('keydown', handleEscapeKey);
    }

    function closeProfileModal() {
        const modal = document.getElementById(PROFILE_MODAL_ID);
        if (modal) {
            modal.style.display = 'none';
        }
        document.removeEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            closeProfileModal();
        }
    }

    function logout() {
        if (confirm('确定要退出登录吗?')) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem('rememberMe');
            window.location.href = 'login.html';
        }
    }

    function loadCurrentUser() {
        const user = getCurrentUser();
        updateUsernameDisplay(user);
        return user;
    }

    document.addEventListener('DOMContentLoaded', function() {
        loadCurrentUser();
        ensureProfileModal();
    });

    window.showProfileModal = showProfileModal;
    window.logout = logout;
    window.loadCurrentUser = loadCurrentUser;
})();
