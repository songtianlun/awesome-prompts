(function () {
  function boot() {
    var root = document.getElementById("case-gallery");
    if (!root || root.dataset.ready === "1") return;
    root.dataset.ready = "1";

    var lang = (document.documentElement.lang || "zh").toLowerCase().indexOf("en") === 0 ? "en" : "zh";
    var ui = lang === "en"
      ? {
          search: "Search titles, prompts, tags",
          category: "Category",
          model: "Model",
          tag: "Tag",
          all: "All",
          reset: "Reset",
          count: function (n, total) { return n + " / " + total + " cases"; },
          empty: "No cases match these filters.",
          copy: "Copy prompt",
          copied: "Copied",
          original: "Original prompt",
          translation: "Chinese translation",
          tips: "How to use it",
          source: "Source",
          license: "License",
          changes: "Changes in this repo",
          reference: "Needs a reference image",
          input: "Input",
          output: "Result",
          close: "Close",
          legacy: "Existing long-form collections",
          remote: "Result media stays on the source site",
          loadError: "Could not load the case data."
        }
      : {
          search: "搜索标题、提示词、标签",
          category: "分类",
          model: "模型",
          tag: "标签",
          all: "全部",
          reset: "重置",
          count: function (n, total) { return "显示 " + n + " / " + total + " 个案例"; },
          empty: "没有符合筛选条件的案例。",
          copy: "复制提示词",
          copied: "已复制",
          original: "原文提示词",
          translation: "中文翻译",
          tips: "用法提示",
          source: "来源",
          license: "许可",
          changes: "本仓库的改动",
          reference: "需要参考图",
          input: "输入",
          output: "结果",
          close: "关闭",
          legacy: "既有长文合集",
          remote: "结果媒体保留在来源站点，未复制进仓库",
          loadError: "案例数据加载失败。"
        };

    function text(value) {
      if (!value) return "";
      if (typeof value === "string") return value;
      return value[lang] || value.zh || value.en || "";
    }

    function esc(value) {
      return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
      });
    }

    function labelOf(list, id) {
      var found = (list || []).filter(function (item) { return item.id === id; })[0];
      return found ? text(found.label) : id;
    }

    root.innerHTML = '<div class="case-toolbar">' +
      '<input class="case-search" type="search" aria-label="' + esc(ui.search) + '" placeholder="' + esc(ui.search) + '">' +
      '<div class="case-filters">' +
      '<label>' + esc(ui.category) + '<select data-filter="category"></select></label>' +
      '<label>' + esc(ui.model) + '<select data-filter="model"></select></label>' +
      '<label>' + esc(ui.tag) + '<select data-filter="tag"></select></label>' +
      "</div></div>" +
      '<p class="case-meta"><span data-count></span><button type="button" class="case-reset">' + esc(ui.reset) + "</button></p>" +
      '<div class="case-grid"></div><dialog class="case-dialog"></dialog><div class="case-legacy"></div>';

    var dataUrl = root.getAttribute("data-cases") || "/data/cases.json";
    fetch(dataUrl).then(function (response) {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    }).then(function (data) {
      render(data);
    }).catch(function () {
      root.querySelector(".case-grid").innerHTML = '<p class="case-empty">' + esc(ui.loadError) + "</p>";
    });

    function render(data) {
      var cases = data.cases || [];
      var search = root.querySelector(".case-search");
      var selects = {
        category: root.querySelector('[data-filter="category"]'),
        model: root.querySelector('[data-filter="model"]'),
        tag: root.querySelector('[data-filter="tag"]')
      };
      var grid = root.querySelector(".case-grid");
      var dialog = root.querySelector(".case-dialog");
      var count = root.querySelector("[data-count]");
      var params = new URLSearchParams(location.search);

      function fill(select, items, key) {
        var options = '<option value="">' + esc(ui.all) + "</option>";
        items.forEach(function (item) {
          options += '<option value="' + esc(item.id) + '">' + esc(text(item.label)) + "</option>";
        });
        select.innerHTML = options;
        if (params.get(key)) select.value = params.get(key);
      }

      fill(selects.category, data.categories || [], "category");
      fill(selects.model, data.models || [], "model");
      var tags = {};
      cases.forEach(function (item) {
        (item.tags || []).forEach(function (tag) { tags[tag] = true; });
      });
      fill(selects.tag, Object.keys(tags).sort().map(function (tag) {
        return { id: tag, label: { zh: tag, en: tag } };
      }), "tag");
      if (params.get("q")) search.value = params.get("q");

      function currentFilters() {
        return {
          q: search.value.trim().toLowerCase(),
          category: selects.category.value,
          model: selects.model.value,
          tag: selects.tag.value
        };
      }

      function matches(item, filters) {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.model && item.model !== filters.model) return false;
        if (filters.tag && (item.tags || []).indexOf(filters.tag) === -1) return false;
        if (!filters.q) return true;
        var blob = [
          text(item.title), text(item.description), text(item.tips),
          item.prompt, item.prompt_translations && item.prompt_translations.zh,
          (item.tags || []).join(" "), item.model, item.category
        ].join("\n").toLowerCase();
        return blob.indexOf(filters.q) !== -1;
      }

      function syncUrl(filters) {
        var next = new URLSearchParams();
        if (filters.q) next.set("q", search.value.trim());
        if (filters.category) next.set("category", filters.category);
        if (filters.model) next.set("model", filters.model);
        if (filters.tag) next.set("tag", filters.tag);
        var query = next.toString();
        history.replaceState(null, "", location.pathname + (query ? "?" + query : "") + location.hash);
      }

      function outputOf(item) {
        return (item.images || []).filter(function (image) { return image.role === "output"; })[0] || (item.images || [])[0];
      }

      function draw() {
        var filters = currentFilters();
        syncUrl(filters);
        var visible = cases.filter(function (item) { return matches(item, filters); });
        count.textContent = ui.count(visible.length, cases.length);
        if (!visible.length) {
          grid.innerHTML = '<p class="case-empty">' + esc(ui.empty) + "</p>";
          return;
        }
        grid.innerHTML = visible.map(function (item) {
          var image = outputOf(item);
          var media = image
            ? '<img class="case-card__media" loading="lazy" alt="' + esc(text(image.alt)) + '" src="' + esc(image.src) + '"' +
              (image.width ? ' width="' + image.width + '" height="' + image.height + '"' : "") + ">"
            : '<div class="case-card__fallback">' + esc(ui.remote) + "</div>";
          return '<button type="button" class="case-card" data-id="' + esc(item.id) + '">' +
            media +
            '<span class="case-card__body"><span class="case-card__title">' + esc(text(item.title)) + "</span>" +
            '<span class="case-chips"><span class="case-chip">' + esc(labelOf(data.models, item.model)) + "</span>" +
            '<span class="case-chip">' + esc(labelOf(data.categories, item.category)) + "</span></span></span></button>";
        }).join("");
        grid.querySelectorAll("img").forEach(function (img) {
          img.addEventListener("error", function () {
            var fallback = document.createElement("div");
            fallback.className = "case-card__fallback";
            fallback.textContent = ui.remote;
            img.replaceWith(fallback);
          });
        });
      }

      function fallbackCopy(value) {
        var area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.top = "0";
        area.style.left = "0";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.focus();
        area.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (error) { ok = false; }
        document.body.removeChild(area);
        return ok;
      }

      function copyText(value, button) {
        var previous = button.textContent;
        button.textContent = ui.copied;
        window.setTimeout(function () {
          if (button.textContent === ui.copied) button.textContent = previous;
        }, 1600);
        var legacy = function () {
          if (!fallbackCopy(value)) window.prompt(ui.copy, value);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(function () {}).catch(legacy);
        } else {
          legacy();
        }
      }

      function openCase(id) {
        var item = cases.filter(function (entry) { return entry.id === id; })[0];
        if (!item) return;
        var images = (item.images || []).map(function (image) {
          var caption = (image.role === "input" ? ui.input : ui.output) + (image.remote ? " · " + ui.remote : "");
          return "<figure><img loading=\"lazy\" alt=\"" + esc(text(image.alt)) + "\" src=\"" + esc(image.src) + "\">" +
            "<figcaption>" + esc(caption) + "</figcaption></figure>";
        }).join("");
        var translation = item.prompt_translations && item.prompt_translations.zh;
        dialog.innerHTML = '<div class="case-dialog__scroll"><button type="button" class="case-dialog__close" aria-label="' + esc(ui.close) + '">×</button>' +
          "<h2>" + esc(text(item.title)) + "</h2>" +
          '<p class="case-chips"><span class="case-chip">' + esc(labelOf(data.models, item.model)) + "</span>" +
          '<span class="case-chip">' + esc(labelOf(data.categories, item.category)) + "</span>" +
          (item.tags || []).map(function (tag) { return '<span class="case-chip">' + esc(tag) + "</span>"; }).join("") +
          "</p><p>" + esc(text(item.description)) + "</p>" +
          (item.requires_reference ? "<p><strong>" + esc(ui.reference) + "</strong></p>" : "") +
          (images ? '<div class="case-dialog__images">' + images + "</div>" : "") +
          "<h3>" + esc(ui.tips) + "</h3><p>" + esc(text(item.tips)) + "</p>" +
          (item.parameters ? "<p><code>" + esc(item.parameters) + "</code></p>" : "") +
          '<div class="case-prompt"><div class="case-prompt__bar"><strong>' + esc(ui.original) + "</strong>" +
          '<button type="button" class="case-copy" data-copy="prompt">' + esc(ui.copy) + "</button></div><pre></pre></div>" +
          (translation ? '<div class="case-prompt"><div class="case-prompt__bar"><strong>' + esc(ui.translation) + "</strong>" +
            '<button type="button" class="case-copy" data-copy="zh">' + esc(ui.copy) + "</button></div><pre></pre></div>" : "") +
          '<p class="case-source"><strong>' + esc(ui.source) + ':</strong> <a href="' + esc(item.source.url) + '" target="_blank" rel="noopener noreferrer">' +
          esc(item.source.author) + (item.source.title ? " — " + esc(item.source.title) : "") + "</a><br>" +
          "<strong>" + esc(ui.license) + ":</strong> " +
          (item.source.license_url ? '<a href="' + esc(item.source.license_url) + '" target="_blank" rel="noopener noreferrer">' + esc(item.source.license) + "</a>" : esc(item.source.license)) +
          (item.source.changes ? "<br><strong>" + esc(ui.changes) + ":</strong> " + esc(item.source.changes) : "") +
          "</p></div>";
        dialog.querySelectorAll("pre")[0].textContent = item.prompt;
        if (translation) dialog.querySelectorAll("pre")[1].textContent = translation;
        dialog.querySelector(".case-dialog__close").addEventListener("click", function () { dialog.close(); });
        dialog.querySelectorAll("[data-copy]").forEach(function (button) {
          button.addEventListener("click", function () {
            copyText(button.getAttribute("data-copy") === "zh" ? translation : item.prompt, button);
          });
        });
        if (!dialog.open) dialog.showModal();
        if (location.hash !== "#" + id) history.replaceState(null, "", location.pathname + location.search + "#" + id);
      }

      grid.addEventListener("click", function (event) {
        var card = event.target.closest(".case-card");
        if (card) openCase(card.getAttribute("data-id"));
      });
      [search, selects.category, selects.model, selects.tag].forEach(function (control) {
        control.addEventListener("input", draw);
        control.addEventListener("change", draw);
      });
      root.querySelector(".case-reset").addEventListener("click", function () {
        search.value = "";
        selects.category.value = "";
        selects.model.value = "";
        selects.tag.value = "";
        draw();
      });
      dialog.addEventListener("close", function () {
        if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      });
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
      });

      var legacy = data.legacy_collections || [];
      if (legacy.length) {
        root.querySelector(".case-legacy").innerHTML = "<h2>" + esc(ui.legacy) + "</h2><ul>" +
          legacy.map(function (item) {
            var href = lang === "en" && item.href_en ? item.href_en : item.href;
            return "<li><a href=\"" + esc(href) + "\">" + esc(text(item.title)) + "</a></li>";
          }).join("") + "</ul>";
      }

      draw();
      var hashId = (location.hash || "").replace(/^#/, "");
      if (hashId) openCase(hashId);
    }
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
