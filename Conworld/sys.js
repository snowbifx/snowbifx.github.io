let paths = {
    "worldbuilding": {
        "type": "folder",
        "data": {
            "overview": {
                "type": "html",
                "data": "files/overview.html"
            }
        }
    },
    
    "Conlanging": {
        "type": "folder",
        "data": {
            "Langs": {
                "type": "folder",
                "data": {
                    "Common Tode": {
                        "type": "pdf",
                        "data": "files/tode.pdf"
                    },
                    "Nkare Tosa": {
                        "type": "pdf",
                        "data": "files/nkare_tosa.pdf"
                    },
                    "Elakwii": {
                        "type": "pdf",
                        "data": "files/elakwii.pdf"
                    },
                    "Chanya": {
                        "type": "pdf",
                        "data": "files/Chanya.pdf"
                    },
                    "Phoŕhan Family": {
                        "type": "folder",
                        "data": {
                            "Common Phoŕha": {
                                "type": "pdf",
                                "data": "files/common_phorha.pdf"
                            },
                            "Common Aŕogha": {
                                "type": "pdf",
                                "data": "files/common_arogha.pdf"
                            }
                        }
                    }
                }
            }
        }
    }
};

function load_file(f) {
    $("#content")[0].innerHTML = `<iframe src="${f}"></iframe>`;
}

function do_name(name, entry) {
    if (entry.type == "folder") return do_list(name, entry);

    let icons = {"pdf": "fa-file-pdf"};
    return `<div class="entry"><i class="far ${icons[entry.type] === undefined ? "fa-file-alt" : icons[entry.type]}"></i> <a href="#" onclick="load_file('${entry.data}')">${name}</a></div>`;
}

function do_list(n, e) {
    let r = `<div class="entry"><i class="far fa-folder"></i> ${n}`;
    for (let name in e.data) r += do_name(name, e.data[name]);
    return r + "</div>";
}

$(document).ready(() => {
    let c = "";
    for (let name in paths) c += do_name(name, paths[name]);
    $("#nav")[0].innerHTML = c;
});